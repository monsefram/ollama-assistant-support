/* =====================================================================
   JARVITO — Comparateur de modèles (page indépendante)
   Projet : serveur IA self-hosted avec Ollama pour le support technique

   Envoie une même question à deux modèles en parallèle et affiche les
   deux réponses côte à côte, avec le temps, la vitesse (tokens/s) et le
   nombre de tokens. Objectif pédagogique : comparer concrètement la
   qualité et la rapidité de plusieurs modèles sur le même matériel.

   Tout est 100 % local (http://localhost:11434). Aucune donnée n'est
   envoyée en ligne.
   ===================================================================== */

"use strict";

const OLLAMA_URL = "http://localhost:11434";

/* Même esprit que l'assistant principal : on garde le même system prompt et
   les mêmes réglages d'inférence pour que la comparaison soit honnête (seul
   le modèle change). Pas de RAG ici : on veut comparer les modèles eux-mêmes. */
const SYSTEM_PROMPT = `Tu es un assistant de support informatique. Ton rôle est d'aider l'utilisateur à diagnostiquer et résoudre ses problèmes informatiques.

PÉRIMÈTRE (très large) : tout ce qui touche à un ordinateur, un téléphone, une tablette ou un appareil connecté entre dans ton périmètre (réseau, lenteur, plantages, mises à jour, matériel, logiciels, navigateurs, comptes, courriels, virus et sécurité, messages d'erreur, sauvegarde). Par défaut, considère que la demande EST dans ton périmètre et aide.

RÈGLES DE RÉPONSE :
- Réponds en français, de façon claire et structurée, avec des étapes numérotées concrètes.
- Va à l'essentiel : 3 à 6 étapes maximum, pas de remplissage.
- N'INVENTE JAMAIS de chemin de menu, de bouton ou d'option. Si tu n'es pas certain du chemin exact dans Windows, décris l'action en mots simples au lieu d'inventer une suite de clics.
- Si tu n'es pas certain de la cause ou de la solution, dis-le clairement.

UTILISATION DES CONNAISSANCES FOURNIES :
- Quand un bloc « Connaissances internes » est ajouté avant la question, sers-t'en comme si c'était ta propre connaissance, naturellement.
- Ne mentionne JAMAIS l'existence de ces connaissances, ne parle pas de « source », de « document » ni de « pertinence », et ne dis pas « selon la source ». L'utilisateur ne voit pas ce bloc : réponds-lui directement comme un technicien qui sait.
- Si ces connaissances ne couvrent pas la question, réponds quand même avec tes propres compétences.

Ton ton est calme, précis et rassurant, adapté à une personne non experte.`;

const OPTIONS_INFERENCE = {
  temperature: 0.2,
  top_p: 0.85,
  repeat_penalty: 1.15,
  num_predict: 450,
  num_ctx: 2048
};

/* ---------------------------------------------------------------------
   Références DOM
   --------------------------------------------------------------------- */
const inputEl     = document.getElementById("input");
const sendBtn     = document.getElementById("send-btn");
const statusDot   = document.getElementById("status-dot");
const statusLabel = document.getElementById("status-label");
const selA        = document.getElementById("model-a");
const selB        = document.getElementById("model-b");
const toastEl     = document.getElementById("toast");
const ragToggle   = document.getElementById("rag-toggle");
const ragStatusEl = document.getElementById("rag-status");
const sourcesBar  = document.getElementById("cmp-sources");
const sourcesChips= document.getElementById("cmp-sources-chips");

let enCours = false;
let ragDispo = false;   // la base de connaissances contient-elle des passages ?

/* ---------------------------------------------------------------------
   Initialisation
   --------------------------------------------------------------------- */
window.addEventListener("DOMContentLoaded", async () => {
  detecterModeles();
  verifierStatut();
  setInterval(verifierStatut, 15000);

  // Charge la base de connaissances partagée (gérée par l'assistant principal).
  try {
    const infos = await window.JARVITO_RAG.init();
    ragDispo = infos.passages > 0;
  } catch { ragDispo = false; }
  ragToggle.addEventListener("change", majRagStatus);
  majRagStatus();

  refreshIcons();
});

/* Met à jour l'étiquette de l'interrupteur RAG selon l'état de la base. */
function majRagStatus() {
  if (!ragToggle.checked) {
    ragStatusEl.innerHTML = `<i data-lucide="database"></i> Base désactivée`;
  } else if (!ragDispo) {
    ragStatusEl.innerHTML = `<i data-lucide="database"></i> Base vide`;
  } else {
    const i = window.JARVITO_RAG.infos();
    ragStatusEl.innerHTML = `<i data-lucide="database"></i> ${i.passages} passages · ${i.mode}`;
  }
  refreshIcons();
}

function refreshIcons() { if (window.lucide) window.lucide.createIcons(); }

function toast(message) {
  toastEl.textContent = message;
  toastEl.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toastEl.classList.remove("show"), 2200);
}

/* ---------------------------------------------------------------------
   Statut + détection des modèles installés
   --------------------------------------------------------------------- */
async function verifierStatut() {
  try {
    const r = await fetch(`${OLLAMA_URL}/api/tags`, { signal: AbortSignal.timeout(3000) });
    if (!r.ok) throw new Error();
    statusDot.className = "status-dot online";
    statusLabel.textContent = "Ollama connecté";
  } catch {
    statusDot.className = "status-dot offline";
    statusLabel.textContent = "Ollama hors ligne";
  }
}

async function detecterModeles() {
  let modeles = [];
  try {
    const r = await fetch(`${OLLAMA_URL}/api/tags`, { signal: AbortSignal.timeout(3000) });
    const data = await r.json();
    if (data.models && data.models.length) {
      modeles = data.models.map(m => m.name);
    }
  } catch { /* serveur hors-ligne : repli */ }

  if (!modeles.length) modeles = ["llama3.2", "mistral", "qwen2.5:7b"];

  remplirSelect(selA, modeles);
  remplirSelect(selB, modeles);

  // Par défaut, on présélectionne deux modèles différents pour une vraie comparaison.
  selA.selectedIndex = 0;
  selB.selectedIndex = modeles.length > 1 ? 1 : 0;
}

function remplirSelect(sel, modeles) {
  sel.innerHTML = "";
  modeles.forEach(nom => {
    const opt = document.createElement("option");
    opt.value = nom; opt.textContent = nom;
    sel.appendChild(opt);
  });
}

/* ---------------------------------------------------------------------
   Saisie
   --------------------------------------------------------------------- */
function handleKey(e) {
  if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); lancerComparaison(); }
}
function autoResize(el) {
  el.style.height = "auto";
  el.style.height = Math.min(el.scrollHeight, 170) + "px";
}

/* ---------------------------------------------------------------------
   Lancement de la comparaison (les deux modèles en parallèle)
   --------------------------------------------------------------------- */
async function lancerComparaison() {
  const question = inputEl.value.trim();
  if (!question || enCours) return;

  if (selA.value === selB.value) {
    toast("Choisissez deux modèles différents pour comparer.");
  }

  enCours = true;
  sendBtn.disabled = true;
  inputEl.value = "";
  inputEl.style.height = "auto";

  // Réinitialise les deux colonnes et retire un éventuel gagnant précédent.
  document.querySelectorAll(".cmp-col").forEach(c => c.classList.remove("cmp-winner"));
  prepararColonne("a");
  prepararColonne("b");

  // RAG : on récupère le contexte UNE SEULE FOIS (même question → même
  // contexte), puis on l'injecte à l'identique dans les deux modèles. C'est
  // ce qui rend la comparaison fidèle au vrai assistant.
  let extraits = [];
  if (ragToggle.checked && ragDispo) {
    try { extraits = await window.JARVITO_RAG.recupererContexte(question); } catch { extraits = []; }
  }
  afficherSources(extraits);

  // Bloc de connaissances injecté avant la question (texte brut, sans numéro
  // de source ni score : le modèle ne doit pas y faire référence).
  const contexte = extraits.length
    ? `[Connaissances internes — ne pas mentionner à l'utilisateur, utilise-les comme ta propre connaissance pour répondre]\n` +
      extraits.map(e => e.texte).join("\n\n") +
      `\n[Fin des connaissances internes]\n\n`
    : "";

  // Les deux générations tournent en parallèle ; on attend les deux pour
  // pouvoir désigner le plus rapide.
  const [resA, resB] = await Promise.all([
    genererColonne("a", selA.value, question, contexte),
    genererColonne("b", selB.value, question, contexte)
  ]);

  // Met en évidence le modèle le plus rapide (les deux ont réussi).
  if (resA.ok && resB.ok) {
    const gagnant = resA.secondes <= resB.secondes ? "a" : "b";
    document.getElementById(`col-${gagnant}`).classList.add("cmp-winner");
  }

  enCours = false;
  sendBtn.disabled = false;
  inputEl.focus();
}

/* Vide la colonne et affiche l'indicateur « réflexion ». */
function prepararColonne(slot) {
  const out = document.getElementById(`out-${slot}`);
  out.innerHTML = `
    <div class="typing">Analyse en cours
      <span class="typing-dots"><span></span><span></span><span></span></span>
    </div>`;
  document.getElementById(`time-${slot}`).textContent = "…";
  document.getElementById(`speed-${slot}`).textContent = "—";
  document.getElementById(`tok-${slot}`).textContent = "—";
  refreshIcons();
}

/* Interroge un modèle en streaming et remplit sa colonne au fil de l'eau.
   Le contexte RAG (s'il existe) est préfixé à la question, à l'identique
   pour les deux modèles. Renvoie { ok, secondes } pour désigner le plus rapide. */
async function genererColonne(slot, modele, question, contexte = "") {
  const out      = document.getElementById(`out-${slot}`);
  const timeEl   = document.getElementById(`time-${slot}`);
  const speedEl  = document.getElementById(`speed-${slot}`);
  const tokEl    = document.getElementById(`tok-${slot}`);

  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user",   content: contexte + question }
  ];

  let reponse = "";
  let evalCount = 0;          // nombre de tokens générés (rapporté par Ollama)
  let evalDuration = 0;       // durée de génération en nanosecondes
  const debut = performance.now();

  try {
    const res = await fetch(`${OLLAMA_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: modele,
        stream: true,
        messages,
        options: OPTIONS_INFERENCE,
        keep_alive: "30m"
      })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    out.innerHTML = `<div class="cmp-text bubble-content"></div>`;
    const texteEl = out.querySelector(".cmp-text");
    const curseur = document.createElement("span");
    curseur.className = "cursor";
    texteEl.appendChild(curseur);

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const lignes = decoder.decode(value).split("\n").filter(l => l.trim());
      for (const ligne of lignes) {
        try {
          const data = JSON.parse(ligne);
          reponse += data.message?.content || "";
          texteEl.innerHTML = renderMarkdown(reponse);
          texteEl.appendChild(curseur);
          out.scrollTop = out.scrollHeight;
          // Le dernier objet (done:true) porte les statistiques de génération.
          if (data.done) {
            evalCount = data.eval_count || 0;
            evalDuration = data.eval_duration || 0;
          }
        } catch { /* fragment JSON incomplet : on attend la suite */ }
      }
      // Temps écoulé en direct.
      timeEl.textContent = ((performance.now() - debut) / 1000).toFixed(1) + " s";
    }
    curseur.remove();

    const secondes = (performance.now() - debut) / 1000;
    timeEl.textContent = secondes.toFixed(1) + " s";
    tokEl.textContent  = evalCount ? `${evalCount} tok` : "—";
    // Vitesse pure du modèle : tokens générés / durée de génération réelle.
    const vitesse = (evalCount && evalDuration)
      ? (evalCount / (evalDuration / 1e9))
      : (evalCount ? evalCount / secondes : 0);
    speedEl.textContent = vitesse ? vitesse.toFixed(1) + " tok/s" : "—";

    refreshIcons();
    return { ok: true, secondes };

  } catch (err) {
    afficherErreur(out, err);
    timeEl.textContent  = "échec";
    speedEl.textContent = "—";
    tokEl.textContent   = "—";
    return { ok: false, secondes: Infinity };
  }
}

/* Affiche les sources (passages) injectées, communes aux deux modèles.
   Le score affiché reste dans l'interface : il n'est jamais envoyé au modèle. */
function afficherSources(extraits) {
  if (!extraits.length) { sourcesBar.hidden = true; sourcesChips.innerHTML = ""; return; }
  const parDoc = new Map();
  extraits.forEach(e => {
    const s = e.scoreHybride ?? e.score ?? 0;
    if (!parDoc.has(e.docNom) || s > parDoc.get(e.docNom)) parDoc.set(e.docNom, s);
  });
  sourcesChips.innerHTML = [...parDoc.entries()].map(([nom, score]) => {
    const pct = Math.max(0, Math.min(100, Math.round(score * 100)));
    return `<span class="source-chip">${escapeHtml(nom)}<span class="source-score">${pct}%</span></span>`;
  }).join("");
  sourcesBar.hidden = false;
  refreshIcons();
}

function afficherErreur(out, err) {
  const reseau = String(err.message).includes("fetch")
    || String(err.message).includes("Failed")
    || err.name === "TimeoutError";
  out.innerHTML = reseau
    ? `<div class="error"><i data-lucide="alert-triangle"></i>
        <div><b>Connexion à Ollama impossible.</b><br/>
        Vérifiez que le service est démarré et écoute sur <code>localhost:11434</code>,
        et que le modèle choisi est bien installé (<code>ollama pull …</code>).</div></div>`
    : `<div class="error"><i data-lucide="alert-triangle"></i>
        <div><b>Une erreur est survenue.</b><br/>${escapeHtml(err.message)}</div></div>`;
  refreshIcons();
}

/* ---------------------------------------------------------------------
   Rendu Markdown maison (identique à l'assistant, sécurisé)
   --------------------------------------------------------------------- */
function escapeHtml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function renderMarkdown(texte) {
  let t = escapeHtml(texte);
  t = t.replace(/```(\w*)\n?([\s\S]*?)```/g, (_, l, code) => `<pre><code>${code.replace(/\n$/, "")}</code></pre>`);
  t = t.replace(/`([^`]+)`/g, "<code>$1</code>");
  t = t.replace(/^#{2,3}\s+(.+)$/gm, "<h4>$1</h4>");
  t = t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  t = t.replace(/(^|[^\*])\*([^\*]+?)\*/g, "$1<em>$2</em>");

  const lignes = t.split("\n");
  let html = "", listeType = null;
  const fermer = () => { if (listeType) { html += `</${listeType}>`; listeType = null; } };

  for (const ligne of lignes) {
    const puce = ligne.match(/^\s*[-*]\s+(.+)$/);
    const num  = ligne.match(/^\s*\d+\.\s+(.+)$/);
    if (num) {
      if (listeType !== "ol") { fermer(); html += "<ol>"; listeType = "ol"; }
      html += `<li>${num[1]}</li>`;
    } else if (puce) {
      if (listeType !== "ul") { fermer(); html += "<ul>"; listeType = "ul"; }
      html += `<li>${puce[1]}</li>`;
    } else if (ligne.trim() === "") {
      fermer();
    } else if (/^<(h4|pre)/.test(ligne.trim())) {
      fermer(); html += ligne;
    } else {
      fermer(); html += `<p>${ligne}</p>`;
    }
  }
  fermer();
  return html;
}
