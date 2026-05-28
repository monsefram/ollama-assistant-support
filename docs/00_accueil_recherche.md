# Cahier de recherche – Serveur IA self-hosted avec Ollama

Cours : Veille technologique (420-1SH-SW)  
Sujet : Serveur IA self-hosted avec Ollama pour le support technique  
Dernière mise à jour : 2026-05-28

---

## Navigation

- [[01_journal_recherche]] – Journal de toutes les recherches effectuées
- [[02_sources_detaillees]] – Fiches complètes pour chaque source
- [[04_notes_concepts]] – Explications des concepts clés
- [[05_plan_rapport]] – Plan du rapport final
- [[06_utilisation_ia]] – Déclaration d'utilisation de l'IA

---

## Résumé du projet

Mon projet consiste à installer un serveur IA en local avec **Ollama**, à le configurer pour qu'il agisse comme un assistant de support informatique (via un system prompt), et à coder une interface web en HTML/JavaScript pour interagir avec lui. Je vais aussi comparer deux modèles LLM, **Llama 3.2** et **Mistral 7B**, pour voir lequel répond le mieux aux questions de support technique.

L'avantage principal d'une approche self-hosted, c'est que les données restent sur la machine. Il n'y a pas d'envoi de prompts à un serveur externe.

---

## Objectifs de la recherche

1. Comprendre comment Ollama fonctionne et comment utiliser son API locale (`/api/chat`, `/api/generate`)
2. Identifier les modèles LLM adaptés à un ordinateur portable avec 8 Go de RAM
3. Documenter les risques de l'IA générative (hallucinations, biais, sécurité)
4. Trouver des sources fiables sur la confidentialité des données avec un modèle local
5. Construire un plan de rapport logique basé sur les sources trouvées

---

## Vue d'ensemble des sources

| # | Source | Type | Note /10 |
|---|---|---|---|
| S1 | Documentation API Ollama (GitHub) | Officielle | 10/10 |
| S2 | FAQ officielle Ollama | Officielle | 9/10 |
| S3 | NIST AI Risk Management Framework | Institutionnelle | 9/10 |
| S4 | NIST Generative AI Profile (AI 600-1) | Institutionnelle | 9/10 |
| S5 | OWASP Top 10 for LLM Applications 2025 | Organisme de sécurité | 9/10 |
| S6 | Model Card Llama 3.2 (Meta – GitHub) | Officielle | 8/10 |
| S7 | Mistral 7B – Annonce officielle | Commerciale | 7/10 |
| S8 | IBM – Qu'est-ce que les hallucinations IA | Entreprise privée | 6/10 |
| S9 | Local LLMs – Étude universitaire (Andorre) | Académique | 8/10 |

---

## Fil conducteur

Les recherches suivent la logique du projet :

1. D'abord comprendre **l'outil principal** (Ollama, son API, son fonctionnement local)
2. Ensuite comprendre **les modèles** disponibles (Llama 3.2, Mistral 7B)
3. Puis s'intéresser aux **risques et limites** (hallucinations, sécurité, biais)
4. Enfin ancrer tout ça dans un **cadre institutionnel** (NIST, OWASP)

Ce fil conducteur est repris dans le plan du rapport → [[05_plan_rapport]]
