# Journal de recherche

Cours : Veille technologique (420-1SH-SW)  
Sujet : Serveur IA self-hosted avec Ollama pour le support technique

---

## Tableau des recherches effectuées

| Date | Recherche effectuée | Source trouvée | Type de source | Pourquoi j'ai cherché ça | Ce que j'ai trouvé d'utile | Pertinence /10 |
|---|---|---|---|---|---|---|
| 2026-05-28 | `Ollama API documentation localhost 11434 api/chat api/generate` | Documentation officielle Ollama – GitHub | Documentation officielle | Pour coder l'interface web, j'avais besoin de savoir exactement comment envoyer une question à Ollama depuis du JavaScript. Sans ça, impossible de connecter mon interface au modèle. | L'adresse exacte (`http://localhost:11434/api/chat`), le format JSON des requêtes, comment inclure le system prompt, et comment gérer les réponses en streaming. | 10/10 |
| 2026-05-28 | `Ollama FAQ official how does ollama work locally` | FAQ officielle Ollama | Documentation officielle | Je voulais comprendre ce qui se passe concrètement quand Ollama tourne en local, surtout pour l'argument sur la confidentialité. Mon projet repose sur le fait que les données restent sur ma machine. | Confirmation officielle que les prompts ne quittent jamais l'ordinateur. Ollama gère aussi automatiquement le GPU ou le CPU selon ce qui est disponible. | 9/10 |
| 2026-05-28 | `NIST AI Risk Management Framework 2023` | NIST AI RMF 1.0 – nist.gov | Institutionnelle (gouvernement américain) | Pour parler des risques de l'IA dans mon rapport, je ne voulais pas juste dire "l'IA peut se tromper" sans source sérieuse. J'avais besoin d'un cadre reconnu pour appuyer cette section. | Un vocabulaire officiel pour parler des risques en IA (biais, manque de transparence, sécurité, vie privée) reconnu au niveau international. | 9/10 |
| 2026-05-28 | `NIST Generative AI Profile NIST AI 600-1` | NIST AI 600-1 – Generative AI Profile | Institutionnelle (gouvernement américain) | Le AI RMF général c'est bien, mais mon projet utilise de l'IA générative spécifiquement. J'avais besoin d'une source qui parle exactement des risques des LLM, pas de l'IA en général. | 13 risques spécifiques à l'IA générative dont les hallucinations, les biais et la désinformation. C'est la source la plus précise pour ma section sur les limites. | 9/10 |
| 2026-05-28 | `OWASP Top 10 for Large Language Model Applications 2025` | OWASP Top 10 for LLM Applications 2025 | Organisme de sécurité (OWASP) | Je savais que le prompt injection existait mais je voulais une source fiable pour en parler dans mon rapport, pas juste une définition trouvée sur un blog. | Le prompt injection est le risque #1 selon l'OWASP. Même dans un serveur local, un utilisateur peut tenter de manipuler le modèle pour qu'il ignore le system prompt. | 9/10 |
| 2026-05-28 | `Meta Llama 3.2 1B 3B model card official` | Model Card Llama 3.2 – GitHub meta-llama | Officielle (Meta – entreprise privée) | J'avais besoin de justifier pourquoi j'ai choisi Llama 3.2 et pas un autre modèle. Mon laptop a 8 Go de RAM, donc il fallait trouver une source qui confirme que ce modèle peut tourner dans ces conditions. | Les versions 1B et 3B sont conçues pour des appareils à faibles ressources. Elles supportent le français et ont un contexte de 128 000 tokens. | 8/10 |
| 2026-05-28 | `Mistral 7B official Apache 2.0 license mistral.ai` | Annonce Mistral 7B – mistral.ai | Commerciale (Mistral AI) | Pour la comparaison de modèles dans mon projet, j'avais besoin d'un deuxième modèle libre d'utilisation. Je voulais vérifier la licence avant de l'utiliser. | Mistral 7B est sous licence Apache 2.0, donc totalement libre. Disponible directement dans Ollama avec `ollama pull mistral`. | 7/10 |
| 2026-05-28 | `IBM AI hallucinations definition explanation` | IBM Think – What Are AI Hallucinations | Entreprise privée (IBM) | J'avais besoin d'une définition simple des hallucinations pour expliquer ce concept dans mon rapport sans que ça soit trop technique. | Définition claire et des exemples concrets (modèles qui inventent des citations, des chiffres, des événements). À combiner avec le NIST car IBM est commercial. | 6/10 |
| 2026-05-28 | `local LLM privacy self hosted AI data confidentiality research` | LOCAL LLMs: Safeguarding Data Privacy – Université d'Andorre (ResearchGate) | Académique (université) | L'argument principal de mon projet c'est la confidentialité d'un serveur local. J'avais besoin d'une source académique pour le confirmer, pas juste mon opinion ou de la pub d'Ollama. | Une étude universitaire neutre qui démontre que les LLM locaux réduisent réellement les risques de fuite de données vers des fournisseurs cloud. | 8/10 |
| 2026-05-28 | `Retrieval-Augmented Generation RAG local LLM survey` | RAG for Large Language Models: A Survey – arXiv (2312.10997) | Académique (article de recherche) | Mon projet de base a une limite importante : le modèle ne connaît que ce qu'il a appris pendant l'entraînement. Le RAG est la technique qui permet d'ajouter de nouvelles connaissances à un LLM local sans le réentraîner. Je l'ai cherché pour comprendre comment aller plus loin après le MVP. | Le RAG permet de connecter le modèle à une base de documents locaux. Au lieu d'inventer une réponse, le modèle va d'abord chercher dans les documents, puis formule sa réponse à partir de ce qu'il a trouvé. Concret pour mon cas : je pourrais lui donner un manuel de support informatique et il s'en servirait pour répondre. | 8/10 |

---

## Recherches sans résultat satisfaisant

| Date | Recherche tentée | Problème | Suite à donner |
|---|---|---|---|
| 2026-05-28 | `Freeplane AI integration Ollama service address documentation` | Pas de documentation officielle claire trouvée. Les résultats pointent vers des forums et des issues GitHub, pas de page officielle stable. | Vérifier directement sur le site officiel de Freeplane ou dans les notes de version avec le module IA |

---

## Notes générales sur la recherche

- Les sources institutionnelles (NIST, OWASP) sont les plus fiables pour justifier la partie sur les risques.
- Les sources commerciales (IBM, Mistral AI) sont utiles pour les faits vérifiables, mais je les mentionne toujours avec prudence dans le rapport.
- La documentation officielle d'Ollama sur GitHub est la source technique principale de tout le projet.
- L'étude de l'Université d'Andorre est la seule source académique neutre trouvée sur la confidentialité des LLM locaux.
- L'article arXiv sur le RAG ouvre la porte à une piste d'amélioration concrète à présenter dans la conclusion du rapport.
