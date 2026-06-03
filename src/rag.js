/* =====================================================================
   JARVITO — moteur RAG partagé (lecture seule)
   Projet : serveur IA self-hosted avec Ollama pour le support technique

   Ce module expose la RÉCUPÉRATION de contexte (retrieval) pour qu'une
   page autre que l'assistant principal — par exemple le comparateur de
   modèles — puisse interroger EXACTEMENT la même base de connaissances.

   Il lit les données déjà produites par l'assistant :
     - les passages (texte + métadonnées) dans localStorage (« support-ia-v1 »)
     - les embeddings dans IndexedDB (« support-ia-rag »)
   Il ne modifie rien : l'indexation reste gérée par l'assistant principal.

   API : window.JARVITO_RAG
     await init()        → charge la base ; renvoie { passages, embeddings }
     pret()              → true si au moins un passage est disponible
     infos()             → { passages, mode }
     await recupererContexte(question) → [{ texte, docNom, scoreHybride, ... }]
   ===================================================================== */

(function () {
  "use strict";

  const OLLAMA_URL  = "http://localhost:11434";
  const STORE_KEY   = "support-ia-v1";
  const EMBED_MODEL = "nomic-embed-text:latest";
  const TOP_K       = 2;
  const SEUIL_COS   = 0.50;
  const MMR_LAMBDA  = 0.65;

  const IDB_NAME  = "support-ia-rag";
  const IDB_STORE = "embeddings";

  let ragDB = null;
  const embMap = new Map();           // Map<chunkId, Float32Array>
  let chunks = [];                    // passages (texte + métadonnées)
  let embeddingsActifs = false;       // la base a-t-elle été indexée avec embeddings ?

  /* ---- Lecture des passages depuis localStorage ---- */
  function lireBase() {
    try {
      const brut = localStorage.getItem(STORE_KEY);
      if (!brut) return;
      const s = JSON.parse(brut);
      chunks = (s.kb && s.kb.chunks) || [];
      embeddingsActifs = !!(s.kb && s.kb.embeddings);
    } catch { chunks = []; embeddingsActifs = false; }
  }

  /* ---- Embedding via Ollama (mêmes formats que l'assistant) ---- */
  async function embed(texte) {
    const tentatives = [
      { url: `${OLLAMA_URL}/api/embed`,      body: { model: EMBED_MODEL, input: texte } },
      { url: `${OLLAMA_URL}/api/embeddings`, body: { model: EMBED_MODEL, prompt: texte } }
    ];
    let dernierErreur;
    for (const t of tentatives) {
      try {
        const r = await fetch(t.url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(t.body),
          signal: AbortSignal.timeout(15000)
        });
        if (!r.ok) { dernierErreur = new Error(`HTTP ${r.status}`); continue; }
        const d = await r.json();
        const vecteur = (d.embeddings && d.embeddings[0]) || d.embedding;
        if (vecteur && vecteur.length) return vecteur;
        dernierErreur = new Error("Vecteur vide reçu");
      } catch (e) { dernierErreur = e; }
    }
    throw dernierErreur;
  }

  /* ---- Similarité cosinus ---- */
  function cosinus(a, b) {
    let dot = 0, na = 0, nb = 0;
    for (let i = 0; i < a.length; i++) { dot += a[i]*b[i]; na += a[i]*a[i]; nb += b[i]*b[i]; }
    return dot / (Math.sqrt(na) * Math.sqrt(nb) + 1e-8);
  }

  /* ---- IndexedDB : ouverture + chargement des embeddings en mémoire ---- */
  function ouvrirDB() {
    return new Promise((res, rej) => {
      const req = indexedDB.open(IDB_NAME, 1);
      req.onupgradeneeded = e => e.target.result.createObjectStore(IDB_STORE, { keyPath: "id" });
      req.onsuccess = e => { ragDB = e.target.result; res(); };
      req.onerror   = () => rej(new Error("IndexedDB indisponible"));
    });
  }
  async function chargerEmbeddings() {
    if (!ragDB) return;
    const tx = ragDB.transaction(IDB_STORE, "readonly");
    const tous = await new Promise((res, rej) => {
      const req = tx.objectStore(IDB_STORE).getAll();
      req.onsuccess = () => res(req.result);
      req.onerror = rej;
    });
    tous.forEach(r => embMap.set(r.id, new Float32Array(r.v)));
  }

  /* ---- Scoring (identique à l'assistant) ---- */
  function normaliser(s) {
    return (s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").match(/[a-z0-9]+/g)) || [];
  }
  function scoreBM25(termes, texte) {
    const k1 = 1.5, b = 0.75, moyenneLen = 250;
    const mots = normaliser(texte);
    const freq = {};
    mots.forEach(m => { freq[m] = (freq[m] || 0) + 1; });
    const docLen = mots.length;
    let s = 0;
    termes.forEach(t => {
      if (t.length < 3) return;
      const tf = freq[t] || 0;
      s += (tf * (k1 + 1)) / (tf + k1 * (1 - b + b * docLen / moyenneLen));
    });
    return s / (termes.length || 1);
  }
  function scoreHybride(semScore, bm25Score) {
    return 0.65 * semScore + 0.35 * Math.min(bm25Score, 1);
  }

  /* ---- MMR : diversité des passages retenus ---- */
  function mmr(candidats, topK) {
    if (!candidats.length) return [];
    const selectionnes = [];
    const restants = [...candidats];
    while (selectionnes.length < topK && restants.length) {
      let meilleurIdx = 0, meilleurScore = -Infinity;
      restants.forEach((c, i) => {
        const pertinence = c.scoreHybride;
        const maxSim = selectionnes.length
          ? Math.max(...selectionnes.map(s => {
              const ea = embMap.get(c.id), eb = embMap.get(s.id);
              return (ea && eb) ? cosinus(ea, eb) : 0;
            }))
          : 0;
        const score = MMR_LAMBDA * pertinence - (1 - MMR_LAMBDA) * maxSim;
        if (score > meilleurScore) { meilleurScore = score; meilleurIdx = i; }
      });
      selectionnes.push(restants[meilleurIdx]);
      restants.splice(meilleurIdx, 1);
    }
    return selectionnes;
  }

  /* ---- Récupération : pipeline complet (identique à l'assistant) ---- */
  async function recupererContexte(question) {
    if (!chunks.length) return [];
    const termes = normaliser(question);

    if (embeddingsActifs && embMap.size > 0) {
      let qEmb;
      try { qEmb = new Float32Array(await embed(question)); } catch { qEmb = null; }
      const candidats = chunks
        .map(c => {
          const emb = embMap.get(c.id);
          const sem = (qEmb && emb) ? cosinus(qEmb, emb) : 0;
          const bm25 = scoreBM25(termes, c.texte);
          return { ...c, sem, bm25, scoreHybride: scoreHybride(sem, bm25) };
        })
        .filter(c => c.scoreHybride > SEUIL_COS)
        .sort((a, b) => b.scoreHybride - a.scoreHybride)
        .slice(0, TOP_K * 4);
      return mmr(candidats, TOP_K);
    }

    // Repli mots-clés (embeddings indisponibles).
    return chunks
      .map(c => ({ ...c, scoreHybride: scoreBM25(termes, c.texte) }))
      .filter(c => c.scoreHybride > 0)
      .sort((a, b) => b.scoreHybride - a.scoreHybride)
      .slice(0, TOP_K);
  }

  /* ---- API publique ---- */
  window.JARVITO_RAG = {
    async init() {
      lireBase();
      try { await ouvrirDB(); await chargerEmbeddings(); } catch { /* repli mots-clés */ }
      return { passages: chunks.length, embeddings: embeddingsActifs && embMap.size > 0 };
    },
    pret() { return chunks.length > 0; },
    infos() {
      return {
        passages: chunks.length,
        mode: (embeddingsActifs && embMap.size > 0) ? "hybride + MMR" : "mots-clés"
      };
    },
    recupererContexte
  };
})();
