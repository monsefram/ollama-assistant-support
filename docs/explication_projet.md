# Guide complet du projet JARVITO — pour comprendre et présenter

> Document d'étude : il explique **toute** la structure, **toutes** les bibliothèques et **tout** le fonctionnement du projet, pour pouvoir répondre aux questions pendant la présentation.

---

## 1. Vue d'ensemble (le schéma à avoir en tête)

JARVITO est une **application web** (qui tourne dans le navigateur) qui parle à un **modèle d'IA** (via Ollama). Tout le « cerveau » est dans Ollama ; l'interface ne fait que l'afficher et l'organiser.

```
┌─────────────────── NAVIGATEUR (mon PC) ───────────────────┐
│                                                            │
│   Interface JARVITO (index.html + style.css + script.js)   │
│        │                                                   │
│        │ 1. l'utilisateur tape une question                │
│        ▼                                                   │
│   Moteur RAG (cherche dans mes documents locaux)           │
│        │                                                   │
│        │ 2. ajoute le contexte trouvé à la question        │
│        ▼                                                   │
│   fetch() ──► POST http://localhost:11434/api/chat ────────┼──► OLLAMA
│        ▲                                                   │     (exécute le
│        │ 3. réponse en streaming (mot par mot)             │      modèle LLM)
│        ▼                                                   │
│   Affichage (markdown) + sources + lecture vocale          │
│                                                            │
│   Stockage local : localStorage (textes) + IndexedDB (vecteurs) │
└────────────────────────────────────────────────────────────┘
```

**Les 3 idées clés :**
1. **Tout est local** par défaut : Ollama tourne sur la machine, rien n'est envoyé en ligne.
2. **Pas de framework** : l'interface est en HTML/CSS/JavaScript « pur » (vanilla). J'ai tout codé à la main pour comprendre chaque étape.
3. **Le RAG** permet au modèle de répondre à partir de **mes** documents de support, pas seulement de ce qu'il a appris.

---

## 2. Structure des fichiers

```
/
├── README.md                  → présentation du dépôt
├── src/                       → LE CODE
│   ├── index.html             → la page principale (structure de JARVITO)
│   ├── comparateur.html       → la 2e page (comparer 2 modèles)
│   ├── style.css              → tout le design (≈1000 lignes, CSS pur)
│   ├── script.js              → toute la logique (≈2000 lignes)
│   ├── rag.js                 → moteur RAG partagé (lecture seule) pour le comparateur
│   ├── comparateur.js         → logique du comparateur
│   ├── connaissances/         → 9 documents de support (la base RAG)
│   │   ├── 01_reseau_wifi_windows.md ... 09_navigateur.md
│   └── vendor/                → toutes les librairies en local (mode hors-ligne)
│       ├── fonts.css + fonts/ → polices
│       ├── lucide.min.js      → icônes
│       ├── pdfjs/             → lecture des PDF
│       ├── mammoth.browser.min.js → lecture des DOCX
│       ├── face-api.js        → reconnaissance faciale
│       └── face-models/       → modèles entraînés du Face ID
└── docs/                      → toute la documentation (rapport, journal, sources…)
```

**Pourquoi `index.html` + `style.css` + `script.js` séparés ?** C'est la séparation classique du web : la **structure** (HTML), le **style** (CSS), et le **comportement** (JavaScript). Ça rend le code clair et maintenable.

---

## 3. Toutes les bibliothèques et technologies (et POURQUOI)

| Techno / Librairie | Rôle dans le projet | Pourquoi ce choix |
|---|---|---|
| **Ollama** | Exécute les modèles LLM en local et expose une API REST sur le port 11434 | Gratuit, open source, simple, garde les données en local |
| **qwen2.5 / llama3.2 / mistral** | Les modèles de langage qui génèrent les réponses | Comparés entre eux ; qwen2.5 est le meilleur en suivi de consignes |
| **nomic-embed-text** | Modèle qui transforme un texte en **vecteur** (pour le RAG) | Léger, rapide, conçu pour la recherche sémantique |
| **JavaScript (vanilla)** | Toute la logique de l'app | Aucun framework = je comprends et contrôle tout |
| **fetch() (API navigateur)** | Envoyer les requêtes HTTP à Ollama | Standard moderne, gère le streaming |
| **localStorage (API navigateur)** | Sauvegarde les conversations, réglages, textes des documents | Simple, persistant, pas de serveur |
| **IndexedDB (API navigateur)** | Stocke les **vecteurs** du RAG (gros volume) | localStorage est limité à ~5 Mo ; IndexedDB n'a pas cette limite |
| **Web Speech API (navigateur)** | `speechSynthesis` = lecture vocale (TTS) ; `SpeechRecognition` = micro (STT) | Intégrée au navigateur, pas de librairie à installer |
| **face-api.js + TensorFlow.js** | Reconnaissance faciale (Face ID) | Fait tourner des réseaux de neurones dans le navigateur |
| **pdf.js** (Mozilla) | Extraire le texte des PDF importés dans la base | Standard pour lire des PDF en JavaScript |
| **mammoth.js** | Extraire le texte des fichiers Word (.docx) | Convertit le DOCX en texte/HTML |
| **Lucide** | Les icônes de l'interface (au trait, pro) | Léger, joli, sans emoji |
| **Google Fonts (Hanken Grotesk, JetBrains Mono)** | La typographie | Lisible (UI) + look « technique » (mono) |
| **serve (via npx)** | Petit serveur web local pour ouvrir la page | Évite l'erreur CORS qu'on a en ouvrant le fichier directement |
| **Vast.ai + SSH** | Louer un GPU à l'heure pour accélérer | Mon PC n'a pas de GPU ; option à la demande, pas chère |

> **À retenir** : toutes ces librairies sont dans `src/vendor/` en local → l'app marche **sans Internet**.

---

## 4. Comment marche le chat (étape par étape)

C'est le cœur de l'app. Quand on envoie une question :

1. **`sendMessage()`** récupère le texte, l'affiche, l'ajoute à l'historique, puis appelle `genererReponse()`.
2. **`genererReponse()`** :
   - si le RAG est activé, appelle `recupererContexte()` pour trouver les passages pertinents ;
   - construit le tableau `messages` envoyé au modèle :
     - 1 message `system` (le *system prompt* qui définit JARVITO) ;
     - tout l'historique de la conversation ;
     - sur le **dernier** message utilisateur, on **préfixe le contexte RAG**.
   - envoie la requête à Ollama avec `fetch()`.
3. **Le streaming** : Ollama répond morceau par morceau. On lit le flux avec un `ReadableStream`, on décode chaque ligne JSON, et on ajoute le bout de texte à l'écran → l'effet « machine à écrire ».
4. À la fin : on transforme le texte en HTML (markdown), on affiche les **sources** (badges), le **temps**, et les boutons **Copier / Régénérer**.

**Le code simplifié de la requête :**
```javascript
const res = await fetch(`${OLLAMA_URL}/api/chat`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model: modelSel.value,        // le modèle choisi dans le menu
    stream: true,                 // réponse progressive
    messages: messagesApi,        // system + historique + question
    options: {
      temperature: 0.2,           // bas = factuel, peu d'invention
      top_p: 0.85,
      repeat_penalty: 1.15,
      num_predict: 450,           // limite la longueur de la réponse
      num_ctx: 2048               // taille de la fenêtre de contexte
    },
    keep_alive: "30m"             // garde le modèle en mémoire 30 min
  })
});
```

**Les paramètres d'inférence (à connaître) :**
- **temperature 0.2** : contrôle le « hasard ». Bas = réponses sûres et factuelles (idéal pour du support). Haut = créatif mais invente plus.
- **num_predict 450** : plafond de tokens générés → réponses courtes et rapides.
- **num_ctx 2048** : combien de texte le modèle « voit » d'un coup. Plus petit = plus rapide.
- **keep_alive "30m"** : évite de recharger le modèle à chaque question (coûteux sur CPU).

---

## 5. Comment marche le RAG (en détail, vulgarisé)

**Le problème** : un LLM ne connaît que ce qu'il a appris à l'entraînement. Il ne connaît pas MES documents de support. Le **RAG** (Retrieval-Augmented Generation) règle ça : avant de répondre, on **cherche** dans mes documents et on **donne** les bons passages au modèle.

### Étape A — Indexation (une fois, quand on ajoute un document)
1. **Chunking** (`decouper`) : on coupe le document en petits passages d'environ **300 caractères**, qui se **chevauchent de 80 caractères** (pour ne pas couper une idée en deux).
2. **Embeddings** (`embed`) : chaque passage est envoyé à `nomic-embed-text`, qui le transforme en **vecteur** = une liste de ~768 nombres qui représente le *sens* du passage.
3. **Stockage** : les vecteurs sont rangés dans **IndexedDB** (base du navigateur), les textes dans localStorage.

### Étape B — Recherche (à chaque question)
1. On transforme **la question** en vecteur (le même `embed`).
2. Pour chaque passage, on calcule un **score hybride** :
   - **Score sémantique (65 %)** = **similarité cosinus** entre le vecteur de la question et celui du passage. Ça mesure si les deux parlent de la *même chose*, même avec des mots différents.
   - **Score mots-clés (35 %)** = **BM25**, un calcul classique qui récompense les passages contenant les mots exacts de la question.
3. On garde seulement les passages au-dessus du **seuil 0,50** (`SEUIL_COS`) → évite d'injecter du hors-sujet.
4. **MMR** (Maximal Marginal Relevance) : on choisit les **2 meilleurs** passages (`TOP_K = 2`) **mais** en évitant qu'ils soient trop similaires entre eux → on a de la diversité.
5. On **injecte** ces passages dans le prompt sous un bloc `[Connaissances internes]`, avec la consigne au modèle de **ne jamais** les citer comme « source ».

### Pourquoi hybride (sémantique + mots-clés) ?
- Le **sémantique** comprend le sens (« mon ordi rame » ≈ « lenteur PC »).
- Le **BM25** rattrape les termes exacts (un code d'erreur précis, un nom de menu).
- Ensemble, ils sont plus robustes que l'un ou l'autre seul.

### Ce que l'utilisateur voit
Les **badges de sources** sous la réponse (ex. « imprimante 78 % ») = le document utilisé + son score de pertinence. Ce score est **affiché seulement dans l'interface**, jamais envoyé au modèle.

---

## 6. Le comparateur de modèles (comparateur.html / comparateur.js)

**But** : répondre à l'objectif du projet → comparer plusieurs modèles concrètement.

**Comment ça marche** :
1. On choisit **deux modèles** (menus déroulants remplis par `/api/tags`).
2. On pose **une** question.
3. `lancerComparaison()` récupère le contexte RAG **une seule fois**, puis lance **deux générations en parallèle** avec `Promise.all([...])`.
4. Chaque colonne affiche en direct : le **temps**, la **vitesse en tokens/seconde**, le **nombre de tokens**.
5. À la fin, le modèle **le plus rapide** est mis en évidence.

**La vitesse en tokens/s** est calculée avec deux champs renvoyés par Ollama à la fin :
```
vitesse = eval_count / (eval_duration / 1 000 000 000)
```
(`eval_count` = nb de tokens générés ; `eval_duration` = temps en nanosecondes).

**Le module `rag.js`** : pour que le comparateur utilise **la même base** que l'assistant sans dupliquer le code, j'ai extrait le moteur de recherche RAG dans un fichier partagé `rag.js` (en lecture seule). Il expose `window.JARVITO_RAG`.

---

## 7. L'assistant vocal (la distinction à bien comprendre)

Il y a **DEUX** technologies vocales **opposées** :

| | Sens | Techno | Fonction dans l'app |
|---|---|---|---|
| **Synthèse (TTS)** | texte → son | `speechSynthesis` | **Lire** les réponses à voix haute |
| **Reconnaissance (STT)** | son → texte | `SpeechRecognition` | Le **micro** (dicter une question) |

**Points à savoir :**
- La **synthèse** (lecture) choisit la **meilleure voix** disponible : on privilégie les voix **neuronales** (« Natural »), avec un repli sur une voix locale si la voix choisie échoue (ex. hors-ligne).
- La **reconnaissance** (micro), sur Chrome, **passe par les serveurs de Google** → ce n'est PAS local (limite à mentionner).
- **Bug corrigé** : avant, désactiver la voix ne l'arrêtait pas, car mon repli automatique la relançait sur l'événement « canceled ». J'ai ajouté `arreterVoix()` et un garde-fou (`echecVolontaire`) pour ne relancer la voix que sur un **vrai** échec, jamais sur un arrêt volontaire.

---

## 8. Face ID (prototype expérimental)

**Comment ça marche :**
1. La librairie **face-api.js** détecte le visage, repère **68 points** (yeux, nez, bouche), puis produit un **descripteur** = un vecteur de **128 nombres** = l'« empreinte » du visage.
2. Cette empreinte est sauvegardée dans localStorage.
3. À la vérification, on recalcule une empreinte et on mesure la **distance euclidienne** avec l'empreinte enregistrée. Si la distance est **< 0,5** (`FACE_SEUIL`) → reconnu.

**La calibration (amélioration importante) :**
- Problème observé : ça marchait dans ma lumière, mais plus ailleurs. Cause : l'empreinte dépend des **contrastes** de l'image, qui changent avec l'éclairage.
- Solution : enregistrer **plusieurs empreintes** dans des conditions différentes, et à la vérification garder la **distance la plus petite** (`distanceMin`). C'est le même principe que le vrai Face ID d'iPhone.

**Honnêteté** : c'est un prototype éducatif. Une webcam classique n'est **pas** une vraie sécurité (sensible à la lumière, trompable par une photo).

---

## 9. Le mode 100 % hors-ligne (dossier vendor/)

Au départ, l'interface chargeait ses polices, icônes et librairies depuis des **CDN** (serveurs externes). Donc sans Internet, **rien ne s'affichait**.

**Ce que j'ai fait** : j'ai téléchargé toutes ces librairies dans `src/vendor/` et remplacé les liens externes par des chemins locaux. Maintenant l'app fonctionne **sans aucune connexion** (sauf qu'il faut qu'Ollama tourne).

---

## 10. Le serveur GPU (Vast.ai) — pour la vitesse

**Le problème** : mon PC n'a pas de GPU dédié → Ollama tourne sur le CPU → **5 à 8 minutes** par réponse.

**La solution** : louer un **GPU à l'heure** sur Vast.ai (pour mon usage de 2-3 h/jour).

**Le montage technique :**
1. **Clé SSH** pour s'authentifier sur le serveur.
2. **Template Ollama** sur Vast (le serveur lance Ollama tout seul).
3. **Tunnel SSH** : `ssh ... -L 11435:localhost:11434`. Ça fait croire à mon interface qu'Ollama tourne en local → **aucun code à changer**, et pas de problème de sécurité/CORS.
4. **Port 11435** côté code : pour ne pas entrer en conflit avec un éventuel Ollama installé localement (qui occupe le 11434).
5. **Fix DNS** sur le serveur (`echo "nameserver 8.8.8.8" > /etc/resolv.conf`) car le DNS du conteneur ne répondait pas.

**Résultat** : de **~5-8 min** (CPU) à **quelques secondes** (GPU). Avec 2× RTX (~32 Go VRAM), je peux même faire tourner des modèles 32B.

**Le compromis** : sur un serveur loué, je ne suis plus « 100 % local » → je dis « auto-hébergé sur un serveur **privé** que je contrôle » (différent d'un service tiers type ChatGPT).

---

## 11. Concepts de code importants (pour les questions techniques)

- **Asynchrone (`async` / `await`)** : appeler Ollama prend du temps ; `await` permet d'attendre la réponse sans bloquer l'interface.
- **Streaming (`ReadableStream` + `TextDecoder`)** : on lit la réponse d'Ollama au fur et à mesure, ligne par ligne, pour l'afficher progressivement.
- **`Promise.all`** : dans le comparateur, lance les deux modèles **en même temps** et attend que les deux finissent.
- **localStorage vs IndexedDB** : localStorage pour les petits textes (conversations, réglages) ; IndexedDB pour les gros volumes (vecteurs du RAG).
- **Closures** : dans les boutons « Copier » / « Régénérer », on « capture » le texte de la réponse dans la fonction de clic (ça a corrigé un bug où une apostrophe cassait le bouton).
- **Markdown sécurisé** : ma fonction `renderMarkdown` **échappe d'abord le HTML** (`escapeHtml`) puis applique le formatage → empêche une réponse malveillante d'injecter du code (protection XSS).
- **CSS sans framework** : variables CSS (`:root`), couleurs en `oklch`, ombres en couches, animations (orbe, coche de succès en SVG `stroke-dashoffset`).

---

## 12. Questions probables du prof + réponses prêtes

**Q : Pourquoi local plutôt que ChatGPT ?**
R : Confidentialité. En local, les questions (qui peuvent contenir des infos sensibles d'un service informatique) ne quittent jamais la machine. Une étude de l'Université d'Andorre confirme cet avantage.

**Q : C'est quoi un LLM, en une phrase ?**
R : Un modèle qui **prédit le mot suivant** de façon statistique ; il ne cherche pas dans une base de faits, c'est pour ça qu'il peut « halluciner ».

**Q : Qu'est-ce qu'une hallucination et comment tu la réduis ?**
R : Quand le modèle invente une info avec assurance. Je la réduis avec une température basse (0.2), une règle anti-invention dans le system prompt, et le RAG qui l'ancre dans de vrais documents.

**Q : C'est quoi le RAG, concrètement ?**
R : Avant de répondre, je cherche les passages pertinents dans mes documents (recherche sémantique + mots-clés) et je les donne au modèle. Il répond à partir de **mes** infos, pas seulement de sa mémoire.

**Q : C'est quoi un embedding / la similarité cosinus ?**
R : Un embedding transforme un texte en vecteur de nombres représentant son sens. La similarité cosinus mesure l'angle entre deux vecteurs : proche de 1 = même sens.

**Q : Pourquoi Ollama et pas autre chose ?**
R : Open source, gratuit, simple, API REST locale, et il garde tout sur la machine.

**Q : Comment l'interface parle à Ollama ?**
R : Avec `fetch()` en JavaScript, vers `POST localhost:11434/api/chat`, en JSON, et je lis la réponse en streaming.

**Q : Quelle est la plus grosse limite de ton projet ?**
R : La vitesse sans GPU (mon CPU mettait 5-8 min). Je l'ai résolue avec un serveur GPU loué, mais ça crée un compromis confidentialité/performance que j'assume.

**Q : Pourquoi pas de framework (React, etc.) ?**
R : Pour tout comprendre et contrôler. Le projet est assez petit pour du JavaScript pur, et ça m'a appris les bases du web.

**Q : Le prompt injection, c'est quoi ?**
R : Quand un utilisateur essaie de manipuler l'IA (« oublie tes instructions »). C'est le risque n°1 de l'OWASP pour les LLM. Mon system prompt est conçu pour refuser ces tentatives.

**Q : Comment tu compares deux modèles objectivement ?**
R : Le comparateur leur envoie la même question, le même contexte RAG, en parallèle, et mesure qualité + vitesse (tokens/s). Si l'un est meilleur, c'est dû au modèle, pas aux infos reçues.

**Q : Tes données partent-elles quelque part ?**
R : En mode local, non. Sur le serveur GPU, mes questions y sont envoyées — mais c'est **mon** serveur privé, pas un service tiers.

---

*Bonne présentation ! Tu maîtrises ton projet : tu l'as construit pièce par pièce, tu connais ses forces et tu assumes ses limites — c'est exactement ce qu'on attend.*
