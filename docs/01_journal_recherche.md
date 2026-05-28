# Journal de recherche

Cours : Veille technologique (420-1SH-SW)  
Sujet : Serveur IA self-hosted avec Ollama pour le support technique

---

## Tableau des recherches effectuées

| Date | Recherche effectuée | Source trouvée | Type de source | Résumé court | Pertinence /10 | Utilisation prévue |
|---|---|---|---|---|---|---|
| 2026-05-28 | `Ollama API documentation localhost 11434 api/chat api/generate` | Documentation officielle Ollama – GitHub | Documentation officielle | Décrit toutes les routes de l'API locale d'Ollama (port 11434), dont `/api/chat` et `/api/generate`, avec des exemples de requêtes. | 10/10 | Partie technique : expliquer comment l'interface web communique avec Ollama |
| 2026-05-28 | `Ollama FAQ official how does ollama work locally` | FAQ officielle Ollama | Documentation officielle | Explique le fonctionnement local d'Ollama, la gestion de la mémoire, la confidentialité des données (les prompts ne quittent pas la machine). | 9/10 | Partie technique et confidentialité |
| 2026-05-28 | `NIST AI Risk Management Framework 2023` | NIST AI RMF 1.0 – nist.gov | Institutionnelle (gouvernement américain) | Cadre volontaire publié en janvier 2023 par le NIST pour aider les organisations à identifier, évaluer et gérer les risques liés à l'IA. Basé sur quatre fonctions : Govern, Map, Measure, Manage. | 9/10 | Section sur les risques et les bonnes pratiques en IA |
| 2026-05-28 | `NIST Generative AI Profile NIST AI 600-1` | NIST AI 600-1 – Generative AI Profile | Institutionnelle (gouvernement américain) | Complément au AI RMF 1.0, publié en juillet 2024, qui cible spécifiquement les risques propres à l'IA générative : hallucinations, biais, désinformation, sécurité des données. Identifie 13 risques principaux. | 9/10 | Section sur les limites et risques de l'IA générative |
| 2026-05-28 | `OWASP Top 10 for Large Language Model Applications 2025` | OWASP Top 10 for LLM Applications 2025 | Organisme de sécurité (OWASP) | Liste des 10 principales vulnérabilités de sécurité dans les applications utilisant des LLM, notamment le prompt injection (LLM01), la fuite de données sensibles et les agents non fiables. | 9/10 | Section sécurité / risques (prompt injection) |
| 2026-05-28 | `Meta Llama 3.2 1B 3B model card official` | Model Card Llama 3.2 – GitHub meta-llama | Officielle (Meta – entreprise privée) | Décrit les modèles Llama 3.2 1B et 3B, leurs capacités, leurs limites, leur licence, et leur contexte d'utilisation (appareils à faibles ressources, sur l'appareil). | 8/10 | Justifier le choix d'un modèle léger pour un laptop |
| 2026-05-28 | `Mistral 7B official Apache 2.0 license mistral.ai` | Annonce Mistral 7B – mistral.ai | Commerciale (Mistral AI) | Présentation du modèle Mistral 7B, publié sous licence Apache 2.0, permettant une utilisation libre et locale. Performances comparables à Llama 2 13B malgré une taille plus petite. | 7/10 | Présenter le deuxième modèle pour la comparaison |
| 2026-05-28 | `IBM AI hallucinations definition explanation` | IBM Think – What Are AI Hallucinations | Entreprise privée (IBM) | IBM explique ce que sont les hallucinations dans les LLM : sorties incorrectes ou inventées dues à la façon dont les modèles prédisent les mots sans réelle compréhension factuelle. | 6/10 | Expliquer les hallucinations (source complémentaire seulement) |
| 2026-05-28 | `local LLM privacy self hosted AI data confidentiality research` | LOCAL LLMs: Safeguarding Data Privacy – Université d'Andorre (ResearchGate) | Académique (université) | Étude de cas sur l'utilisation de LLM locaux pour protéger la confidentialité des données dans une université. Démontre que les LLM locaux réduisent les risques de fuite vers des fournisseurs cloud. | 8/10 | Justifier l'intérêt de l'approche self-hosted pour la vie privée |

---

## Recherches sans résultat satisfaisant

| Date | Recherche tentée | Problème | Suite à donner |
|---|---|---|---|
| 2026-05-28 | `Freeplane AI integration Ollama service address documentation` | Pas de documentation officielle claire trouvée. Les résultats pointent vers des forums et des issues GitHub, pas de page officielle stable. | Vérifier directement sur le site officiel de Freeplane ou dans les releases notes de la version avec le module IA |

---

## Notes générales sur la recherche

- Les sources institutionnelles (NIST, OWASP) sont les plus fiables pour la partie risques et bonnes pratiques.
- Les sources commerciales (IBM, Mistral AI) sont utiles, mais il faut les mentionner avec prudence dans le rapport.
- La documentation officielle d'Ollama sur GitHub est directement utilisable comme source technique principale.
- L'étude de l'Université d'Andorre est la seule source académique trouvée sur le sujet de la confidentialité des LLM locaux.
