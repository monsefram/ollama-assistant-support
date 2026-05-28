# Proposition de projet – Serveur IA self-hosted pour le support technique

## Introduction

Aujourd'hui, l'intelligence artificielle est partout. En tant qu'étudiant en informatique, je trouve important de comprendre comment ces outils fonctionnent, pas juste les utiliser en ligne, mais aussi être capable de les installer et les gérer soi-même.

Mon projet consiste à mettre en place un serveur IA local (self-hosted) capable de répondre à des questions de support technique. L'idée, c'est d'avoir un genre de chatbot privé qui roule sur ma propre machine, sans dépendre d'un service cloud comme ChatGPT. En plus d'installer le serveur, je vais coder ma propre interface web avec l'aide de Claude et configurer le modèle avec un system prompt pour qu'il sache qu'il est un assistant de support informatique. Ça s'inscrit directement dans le thème « L'IA au service du développeur » parce que c'est un outil concret qu'un technicien pourrait utiliser dans son travail de tous les jours, et en même temps ça démontre comment l'IA peut aider à développer beaucoup plus vite.

## Prérecherche – Trois idées explorées

### Idée 1 – Un outil qui résume tes notes de cours avec l'IA
Des fois avant un examen, j'ai plein de notes partout, des PDF, des Google Docs, des screenshots. L'idée c'était de faire un petit outil où tu pitches toutes tes notes en vrac et l'IA te fait un résumé clean avec les points importants, genre les trucs à retenir. Mais après y avoir pensé, je me suis dit que c'est surtout juste envoyer du texte à une API et afficher le résultat. J'apprendrais pas grand-chose sur comment l'IA fonctionne.

### Idée 2 – Une todo-list intelligente qui génère tes tâches avec l'IA
L'idée c'était de faire une app de todo-list, mais pas une todo-list normale où tu écris tes tâches toi-même. L'idée c'est que tu lui donnes un projet ou un objectif (genre « je dois faire un site web pour un client ») et l'IA te génère automatiquement une liste de tâches à faire, dans le bon ordre, avec des priorités. Mais au final je me suis rendu compte que comme la première idée, la partie IA c'est juste un appel à une API.

### Idée 3 – Serveur IA self-hosted avec Ollama + interface codée avec Claude (choix retenu)
Installer un modèle d'IA sur ma machine avec Ollama, configurer le modèle avec un system prompt pour qu'il agisse comme un assistant de support informatique, et coder ma propre interface web (HTML/JS) avec l'aide de Claude. C'est l'idée qui m'attire le plus parce que ça touche à l'infrastructure, à l'IA, et en même temps ça montre comment l'IA peut aider un développeur à coder plus vite.

### Pourquoi ce choix ?
J'ai choisi l'idée 3 parce que c'est le projet où j'apprends le plus de nouvelles choses. Je n'ai jamais installé un modèle d'IA moi-même et je suis curieux de voir comment ça marche. En plus, je vais coder avec l'aide de Claude une interface en HTML/JS. Je vais aussi apprendre à configurer le modèle pour qu'il réponde d'une certaine façon, pour qu'il sache qu'il est un assistant de support et qu'il adapte ses réponses en conséquence. Ça me permet de montrer trois choses : je suis capable de mettre en place un serveur IA local, je sais comment personnaliser le comportement d'un modèle, et l'IA est rendue assez forte pour générer du vrai code frontend impressionnant.

Les défis que je vois :
- Choisir le bon modèle selon les capacités de ma machine
- Comprendre les différences entre les modèles (taille, performance, coût, etc.)
- Écrire un bon system prompt pour que le modèle réponde comme un vrai assistant de support
- Connecter mon interface web
- Voir jusqu'où Claude est capable de coder l'interface 

Ressources nécessaires :
- Un ordinateur avec un minimum de 8 Go de RAM
- Ollama (gratuit et open source)
- Claude (pour m'aider à coder l'interface)
- De la documentation en ligne

## Objectifs du projet

1. Installer Ollama sur une machine locale et faire tourner un modèle LLM
2. Configurer un system prompt pour que le modèle agisse comme un assistant de support informatique
3. Coder une interface web simple (HTML/JS) avec l'aide de Claude pour interagir avec le modèle
4. Tester le système avec des questions typiques de support informatique
5. Comparer au moins deux modèles différents (ex : Llama 3 vs Mistral) en termes de qualité de réponse 
6. Documenter l'installation, la configuration du modèle, le code généré par Claude et mes observations

## MVP (Minimum Viable Product)

Mon MVP, c'est simple :

- Ollama est installé et fonctionne sur ma machine
- Au moins un modèle est téléchargé et opérationnel
- Le modèle est configuré avec un system prompt pour répondre comme un assistant de support
- Mon interface web est fonctionnelle dans le navigateur
- Je peux poser une question de support technique et recevoir une réponse cohérente et adaptée au contexte

Si j'arrive à ça, le projet est considéré comme **terminé**. Tout le reste (comparaison de modèles, amélioration de l'interface, etc.) c'est du bonus.

## Méthodologie

Voici comment je compte découper mon travail sur 7 jours :

| Jour | Ce que je fais |
|------|----------------|
| 1 | Recherche sur Ollama, les modèles disponibles et l'API d'Ollama |
| 2 | Installation d'Ollama + téléchargement d'un premier modèle |
| 3 | Écriture et tests du system prompt pour le contexte support informatique |
| 4 | Coder l'interface web avec Claude (HTML/JS) + connecter à l'API d'Ollama local |
| 5 | Tests avec des questions de support + essai d'un deuxième modèle |
| 6 | Documentation de tout le processus (installation + system prompt + code généré par Claude) |
| 7 | Relecture, corrections et remise finale |

## Outils et technologies

- **Ollama** : outil open source pour faire tourner des modèles d'IA en local
- **System prompt** : message de configuration envoyé au modèle pour lui donner son contexte et son rôle
- **HTML / JavaScript** : pour coder l'interface web 
- **Claude** : IA utilisée pour m'aider à coder l'interface
- **Modèles LLM** : Llama 3, Mistral ou autre selon ce qui roule bien sur ma machine
- **GitHub** : pour le dépôt du projet

## Résultats attendus

À la fin du projet, je vais pouvoir :

- Faire une démonstration en direct du serveur IA qui répond à des questions de support via mon interface web
- Montrer que le modèle répond dans le bon contexte grâce au system prompt (il sait qu'il est un assistant de support, il répond pas n'importe quoi)
- Montrer la différence entre deux modèles (qualité des réponses)
- Montrer ce que Claude a été capable de générer comme code


Pour valider que mon projet fonctionne, je vais préparer une liste de 10 questions de support technique et vérifier que le système donne des réponses utiles et adaptées au contexte de support.

lien git : 
>https://github.com/monsefram/Projet-cours-technologie


## Utilisation de l'IA

Oui, j'ai utilisé l'IA pour deux choses dans ce projet :

1. **GitHub Copilot** : pour m'aider avec la recherche technique et la mise en forme de cette proposition
2. **Claude** : sera utilisé pendant le projet pour coder l'interface web et pour m'aider 

Les prompts utilisés pour la rédaction de cette proposition sont en annexe.

---

## Annexe – Prompts utilisés

**Prompt 1 :**
> c est quoi ollama est ce que ca roule sur un pc normal si je le telecharge ?


**Prompt 2 :**

>c est quoi les étapes pour l installer comment faire ?

**Prompt 3 :**
> c est quoi la difference entre llama 3 et mistral ? lequel est mieux pour répondre a des questions de support informatique (pour un projet d'école)

**Prompt 4 :**
> comment faire pour faire des appelle api avec du javascript ollama ? explique toute les etapes 

**Prompt 5 :**
> c est quoi un system prompt ? comment je fais pour dire a ollama qu il est un assistant de support informatique et qu il doit répondre juste a des questions de support et qu'il ait le contexte de où il est 

**Prompt 6 :**
> j ai écrit ma proposition de projet en word, peux tu me la convertir en markdown et corrigée les fautes et ameliorer le text si il le faut  : [texte de la proposition collé ici] et voici l'énoncé : [énoncé]

