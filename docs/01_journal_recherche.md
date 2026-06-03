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

## Observations pratiques (tests sur ma machine)

Ces constats viennent de tests réels faits pendant le développement de l'interface, pas d'une source en ligne. Ils sont importants car ils montrent que le choix d'un modèle dépend autant du matériel que de la qualité théorique du modèle.

| Date | Test effectué | Ce que j'ai observé | Conclusion |
|---|---|---|---|
| 2026-05-31 | Comparaison Llama 3.2 (3B) vs Mistral (7B) sur la même question de support (« mon ordinateur est lent depuis une mise à jour ») | Llama 3.2 invente des chemins de menus Windows qui n'existent pas (ex. « Propriétés dans la barre d'outils du Gestionnaire des tâches »). Mistral donne des étapes correctes et réalistes. | Un modèle 3B hallucine les interfaces logicielles même avec une bonne base de connaissances (RAG). La taille du modèle a un impact direct sur la fiabilité des réponses techniques. |
| 2026-05-31 | Mesure du temps de réponse et vérification du matériel (`Get-CimInstance Win32_VideoController`) | Réponses entre 96 et 174 secondes même pour un modèle 3B. Carte graphique : Intel UHD Graphics (intégrée), pas de GPU dédié NVIDIA/AMD. | Sans GPU dédié, Ollama exécute le modèle sur le processeur (CPU), ce qui est beaucoup plus lent. La contrainte réelle n'est pas la RAM (16 Go) mais l'absence de GPU. Cela plafonne le choix à un modèle 7B ; un 14B serait trop lent (plusieurs minutes par réponse). |
| 2026-05-31 | Réglage des paramètres d'inférence dans l'interface | En baissant la température de 0.8 (défaut) à 0.2, les réponses deviennent plus factuelles et le modèle invente beaucoup moins. | La température est un levier concret pour fiabiliser un assistant de support : on privilégie la précision à la créativité. |
| 2026-06-02 | Optimisation de la vitesse de génération avec qwen2.5:7b (temps observé : ~490s par réponse) | J'ai cherché ce qu'on pouvait faire côté code pour accélérer sans changer de modèle. J'ai trouvé trois paramètres Ollama que je ne connaissais pas : `keep_alive` pour garder le modèle en mémoire entre les requêtes, `num_predict` pour plafonner le nombre de tokens générés, et `num_ctx` pour réduire la fenêtre de contexte. J'ai aussi réduit le nombre de passages RAG injectés (TOP_K) de 3 à 2. | Ces paramètres permettent d'optimiser l'inférence sans changer de modèle. `keep_alive: 30m` évite le rechargement du modèle à chaque requête (coûteux sur CPU). `num_predict: 450` coupe la génération quand la réponse est assez longue — 450 tokens c'est déjà 5-6 étapes structurées, largement suffisant pour du support. `num_ctx: 2048` réduit la fenêtre d'attention, ce qui accélère le calcul sur CPU car la complexité scale en O(n²) avec la taille du contexte. J'ai choisi de rester sur le 7B pour garder la qualité : un 3B serait plus rapide mais hallucinerait plus les interfaces Windows, ce qu'on a déjà observé avec llama3.2. |
| 2026-06-03 | Développement d'un comparateur de modèles côte à côte (page dédiée dans l'interface) | J'ai créé une deuxième page `comparateur.html` accessible depuis un bouton dans la sidebar. On choisit deux modèles installés sur Ollama, on pose une question, et les deux répondent en parallèle en streaming. À la fin, le plus rapide est mis en évidence. Pour rendre la comparaison honnête, j'ai connecté le comparateur à la même base de connaissances RAG que l'assistant principal : le contexte est récupéré une seule fois puis injecté à l'identique dans les deux modèles. J'ai aussi affiché les statistiques par modèle : temps total en secondes, vitesse en tokens/s (calculée avec `eval_count` et `eval_duration` retournés par Ollama), et nombre de tokens générés. | C'est la fonctionnalité la plus directement liée à l'objectif du projet : comparer concrètement plusieurs modèles. Voir les deux réponses côte à côte, avec les chiffres de vitesse, rend la différence entre un 3B et un 7B immédiatement visible. Le fait d'injecter le même contexte RAG dans les deux est important : ça montre que la différence de qualité vient du modèle et pas de ce qu'il a reçu comme informations. |
| 2026-06-03 | Passage de l'interface en mode 100 % hors ligne (rapatriement des librairies en local) | En testant sans connexion, j'ai réalisé que l'interface ne se chargeait pas du tout : les polices (Google Fonts), les icônes (Lucide via unpkg), et les librairies comme pdf.js et mammoth.js étaient toutes chargées depuis des CDN externes. J'ai rapatrié tous ces fichiers dans un dossier `src/vendor/` (10,4 Mo au total) et mis à jour les chemins dans le code. Les modèles de reconnaissance faciale (Face ID) ont aussi été téléchargés localement. | La formulation « Exécution 100 % locale » dans l'interface n'était pas tout à fait vraie avant : le navigateur contactait des serveurs tiers au chargement. Maintenant c'est exact. Le projet fonctionne sur une machine entièrement débranchée d'Internet, tant qu'Ollama tourne en local. C'est un argument de confidentialité beaucoup plus solide à présenter. |

**Décision retenue :** utiliser **qwen2.5:7b** comme modèle principal. C'est le meilleur compromis qualité/vitesse pour une machine sans GPU dédié : même poids et même vitesse que Mistral, mais meilleur suivi des consignes et moins d'hallucinations sur les interfaces Windows.

---

## Pistes d'amélioration identifiées (2026-05-31)

Ces pistes découlent des tests effectués sur l'interface. Elles montrent que le projet est vivant et qu'on a identifié des problèmes réels avec des solutions concrètes.

| Priorité | Amélioration | Raison identifiée | Impact |
|---|---|---|---|
| 1 | Bouton « Régénérer » la dernière réponse | Le modèle dérape parfois ; pouvoir relancer sans retaper est essentiel en support | Confort utilisateur |
| 1 | Étoffer la base de connaissances (imprimantes, comptes, son, navigateurs) | Chaque sujet absent force le modèle à inventer ; on l'a prouvé avec le chemin « navigateur par défaut » | Fiabilité du RAG |
| 2 | Afficher le score de pertinence RAG dans l'interface (pas dans le prompt) | Rend le RAG visible et démontrable ; utile pour la présentation | Pédagogie |
| 2 | Mode comparaison de modèles côte à côte | Répond directement à l'objectif du projet (comparer llama3.2 vs mistral vs qwen) | Valeur pédagogique forte |
| 3 | Meilleure gestion hors-ligne (message clair + bouton Réessayer) | Aujourd'hui l'erreur est brute quand Ollama n'est pas lancé | Robustesse |
| 3 | Export d'une conversation en .txt ou .md | Utile pour inclure des exemples dans le rapport final | Documentation |
| 3 | Bouton Stop pendant la génération | Confort quand une réponse part trop longtemps | Confort utilisateur |

**Cycle d'amélioration RAG démontré :** réponse fausse → identification du chemin inventé → enrichissement de la base → le modèle se corrige. Ce cycle a été répété 2 fois (chemins Windows Update et navigateur par défaut). C'est une démarche expérimentale à documenter dans le rapport.

---

## Notes générales sur la recherche

- Les sources institutionnelles (NIST, OWASP) sont les plus fiables pour justifier la partie sur les risques.
- Les sources commerciales (IBM, Mistral AI) sont utiles pour les faits vérifiables, mais je les mentionne toujours avec prudence dans le rapport.
- La documentation officielle d'Ollama sur GitHub est la source technique principale de tout le projet.
- L'étude de l'Université d'Andorre est la seule source académique neutre trouvée sur la confidentialité des LLM locaux.
- L'article arXiv sur le RAG ouvre la porte à une piste d'amélioration concrète à présenter dans la conclusion du rapport.
- Les tests pratiques (section Observations) montrent une limite concrète du projet : sans GPU dédié, le matériel — et non la RAM — dicte le choix du modèle. C'est un point fort à présenter, car il ancre le projet dans une contrainte réelle et mesurée.
