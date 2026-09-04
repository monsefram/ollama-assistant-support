# Serveur IA self-hosted avec Ollama pour le support technique

**FR** — Assistant IA de **support informatique** auto-hébergé : un serveur **Ollama** local, un assistant configuré par *system prompt*, et une interface web (chat, **RAG** sur une base de connaissances, reconnaissance vocale, comparateur de modèles). **100 % hors ligne** — aucune donnée ne quitte la machine.

**EN** — A self-hosted **IT-support** AI assistant: a local **Ollama** server, an assistant configured via a system prompt, and a web UI (chat, **RAG** over a knowledge base, voice input, model comparator). **Fully offline** — no data leaves the machine.

**Stack** : JavaScript · HTML/CSS · Ollama (`localhost:11434`) · RAG · pdf.js / mammoth.js.

Cours : Veille technologique (420-1SH-SW) · Session : H26

---

## À propos de ce dépôt

Ce dépôt contient l'ensemble du travail réalisé pour le cours de veille technologique. Le projet porte sur la mise en place d'un serveur IA local avec **Ollama**, la configuration d'un assistant de support informatique via un system prompt, et le développement d'une interface web en HTML/JavaScript pour interagir avec le modèle localement.

---

## Structure du dépôt

```
/
├── README.md                    → Ce fichier
├── src/                         → Code source de l'interface web
│   ├── index.html               → Structure de la page (JARVITO)
│   ├── comparateur.html         → Comparateur de modèles côte à côte
│   ├── style.css                → Thème visuel
│   ├── script.js                → Logique : chat, RAG, voix, Face ID
│   ├── rag.js                   → Moteur RAG partagé (lecture de la base)
│   ├── comparateur.js           → Logique du comparateur (2 modèles en parallèle)
│   ├── vendor/                  → Librairies et polices servies localement (hors ligne)
│   │   ├── fonts.css + fonts/   → Polices Hanken Grotesk + JetBrains Mono
│   │   ├── lucide.min.js        → Icônes
│   │   ├── pdfjs/               → Lecture des PDF importés
│   │   ├── mammoth.browser.min.js → Lecture des DOCX importés
│   │   ├── face-api.js          → Prototype Face ID
│   │   └── face-models/         → Modèles de reconnaissance faciale
│   └── connaissances/           → Documents pour la base de connaissances RAG
│       ├── 01_reseau_wifi_windows.md
│       ├── 02_demarrage_windows.md
│       ├── 03_securite_virus.md
│       ├── 04_maintenance_nettoyage_pc.md
│       ├── 05_chemins_raccourcis_windows.md
│       ├── 06_imprimante.md
│       ├── 07_comptes_mots_de_passe.md
│       ├── 08_son_audio.md
│       └── 09_navigateur.md
└── docs/                        → Documentation du projet
    ├── proposition.md           → Proposition de projet initiale
    ├── carte-mentale/           → Carte mentale (.mm et .pdf)
    ├── rapport_final.md         → Rapport final (à compléter)
    ├── 00_accueil_recherche.md
    ├── 01_journal_recherche.md
    ├── 02_sources_detaillees.md
    ├── 04_notes_concepts.md
    ├── 05_plan_rapport.md
    └── 06_utilisation_ia.md
```

### Lancer l'interface

```powershell
npx -y serve "src" -p 3000
# puis ouvrir http://localhost:3000
```

> **Fonctionne 100 % hors ligne.** Toutes les librairies et polices sont servies
> depuis `src/vendor/` : aucune connexion Internet n'est requise. Le projet ne
> dépend que d'Ollama tournant en local (`localhost:11434`). Aucune donnée ne
> quitte la machine.

---

## Où trouver quoi

| Ressource | Lien |
|---|---|
| Interface web (code) | [src/](src/) |
| Base de connaissances RAG | [src/connaissances/](src/connaissances/) |
| Proposition de projet | [docs/proposition.md](docs/proposition.md) |
| Carte mentale (.mm) | [docs/carte-mentale/carte_mentale.mm](docs/carte-mentale/carte_mentale.mm) |
| Carte mentale (.pdf) | [docs/carte-mentale/carte_mentale.pdf](docs/carte-mentale/carte_mentale.pdf) |
| Accueil du cahier de recherche | [docs/00_accueil_recherche.md](docs/00_accueil_recherche.md) |
| Journal de recherche | [docs/01_journal_recherche.md](docs/01_journal_recherche.md) |
| Sources détaillées | [docs/02_sources_detaillees.md](docs/02_sources_detaillees.md) |
| Notes de concepts | [docs/04_notes_concepts.md](docs/04_notes_concepts.md) |
| Plan du rapport | [docs/05_plan_rapport.md](docs/05_plan_rapport.md) |
| Utilisation de l'IA | [docs/06_utilisation_ia.md](docs/06_utilisation_ia.md) |
| Rapport final | [docs/rapport_final.md](docs/rapport_final.md) |

---

## Lien du dépôt GitHub

https://github.com/monsefram/ollama-assistant-support
