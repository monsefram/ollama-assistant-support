# Plan du rapport

Cours : Veille technologique (420-1SH-SW)  
Sujet : Serveur IA self-hosted avec Ollama pour le support technique

Ce plan représente la table des matières définitive du rapport final. Chaque section est décrite avec son objectif, les sources à utiliser et les idées à développer.

---

## Table des matières préliminaire

1. Introduction
2. Contexte et besoin
3. IA locale et modèles LLM
4. Présentation d'Ollama
5. Interface web et API locale
6. Choix et comparaison des modèles
7. Utilisation dans le support informatique
8. Limites et risques
9. Conclusion

---

## 1. Introduction

**Objectif de la section**  
Présenter le sujet, expliquer l'angle choisi et donner au lecteur une idée claire de ce que le rapport va couvrir.

**Sources utilisées**  
Aucune source externe nécessaire. C'est une section de présentation personnelle.

**Idées à développer**
- Pourquoi s'intéresser à l'IA locale plutôt qu'aux services cloud ?
- Quel est le lien avec le domaine du support informatique ?
- Présentation rapide du MVP : Ollama + system prompt + interface web + comparaison de deux modèles
- Plan du rapport en quelques phrases

---

## 2. Contexte et besoin

**Objectif de la section**  
Expliquer pourquoi le projet fait du sens : quels sont les problèmes avec les outils IA en ligne, et pourquoi un assistant local répond mieux à certains besoins.

**Sources utilisées**
- S2 (FAQ Ollama) : les données ne quittent pas la machine
- S9 (Université d'Andorre) : étude sur la confidentialité des LLM locaux

**Idées à développer**
- Les assistants IA en ligne (ChatGPT, Claude) envoient les données à des serveurs externes
- Dans un contexte professionnel, ça peut poser des problèmes de confidentialité
- Un assistant local permet de garder le contrôle des données
- Le support informatique est un cas d'usage concret où la confidentialité peut compter (questions sur des systèmes internes, des mots de passe, etc.)

---

## 3. IA locale et modèles LLM

**Objectif de la section**  
Expliquer ce qu'est un LLM, comment il fonctionne à grande ligne, et pourquoi il est maintenant possible de faire tourner ces modèles sur un ordinateur personnel.

**Sources utilisées**
- S6 (Model Card Llama 3.2) : les modèles 1B et 3B sont conçus pour des appareils à faibles ressources
- S4 (NIST AI 600-1) : définition de l'IA générative et de ses caractéristiques
- S8 (IBM) : explication des hallucinations (complémentaire)

**Idées à développer**
- Un LLM prédit le prochain mot, il ne cherche pas dans une base de données de faits
- Les modèles ont des tailles différentes (paramètres) : plus c'est gros, plus c'est puissant mais plus ça consomme de ressources
- Les modèles légers comme Llama 3.2 1B/3B peuvent tourner sur un laptop avec 8 Go de RAM
- La miniaturisation des modèles ouvre la porte aux déploiements locaux

---

## 4. Présentation d'Ollama

**Objectif de la section**  
Expliquer ce qu'est Ollama, comment il s'installe, comment il fonctionne, et pourquoi c'est l'outil choisi pour ce projet.

**Sources utilisées**
- S1 (Documentation API Ollama) : fonctionnement de l'API REST
- S2 (FAQ Ollama) : gestion de la mémoire, fonctionnement local, adresse par défaut

**Idées à développer**
- Ollama est un outil open source qui simplifie le téléchargement et l'exécution de LLM en local
- Il expose une API REST sur `http://localhost:11434`
- Les commandes de base : `ollama pull [modèle]`, `ollama run [modèle]`, `ollama list`
- Les données restent sur la machine (point fort pour la confidentialité)
- Ollama gère automatiquement le GPU ou le CPU selon ce qui est disponible

---

## 5. Interface web et API locale

**Objectif de la section**  
Décrire l'interface web développée pour interagir avec Ollama, expliquer comment elle communique avec l'API locale, et montrer le rôle du system prompt.

**Sources utilisées**
- S1 (Documentation API Ollama) : format des requêtes `/api/chat`, paramètres JSON, streaming

**Idées à développer**
- L'interface est une page HTML/JavaScript simple avec un champ de saisie et une zone d'affichage des réponses
- Les requêtes sont envoyées à `POST http://localhost:11434/api/chat` via `fetch()` en JavaScript
- Le system prompt est inclus dans le tableau `messages` avec le rôle `system`
- La réponse arrive en streaming : les mots apparaissent progressivement (comme dans ChatGPT)
- Code partiel de la requête à montrer dans le rapport pour illustrer le fonctionnement

---

## 6. Choix et comparaison des modèles

**Objectif de la section**  
Présenter les deux modèles utilisés (Llama 3.2 et Mistral 7B), justifier leur choix, et comparer leurs performances sur des questions de support informatique.

**Sources utilisées**
- S6 (Model Card Llama 3.2) : caractéristiques techniques de Llama 3.2
- S7 (Annonce Mistral 7B) : licence Apache 2.0, performances, caractéristiques

**Idées à développer**
- Présentation de Llama 3.2 : développé par Meta, versions 1B et 3B, licence Meta Community, optimisé pour les appareils à faibles ressources, supporte le français
- Présentation de Mistral 7B : développé par Mistral AI (France), licence Apache 2.0, 7 milliards de paramètres, très bon rapport qualité/ressources
- Tableau comparatif : taille, licence, langue française, qualité des réponses de support
- Résultats des tests avec 5-10 questions de support typiques
- Quel modèle a mieux performé et pourquoi ?

---

## 7. Utilisation dans le support informatique

**Objectif de la section**  
Montrer concrètement comment l'assistant répond à des questions de support informatique, évaluer la pertinence des réponses et discuter des forces du système.

**Sources utilisées**
- S1 (Documentation API Ollama) : pour illustrer comment le system prompt est envoyé
- S2 (FAQ Ollama) : pour rappeler que les données restent locales

**Idées à développer**
- Présentation du system prompt utilisé
- Liste de 10 questions de support testées (ex: "Mon Wi-Fi ne fonctionne plus", "Comment réinitialiser un mot de passe Windows", etc.)
- Analyse de 3-5 réponses : est-ce que la réponse est correcte ? Est-ce qu'elle est utile ?
- Le modèle reste-t-il dans le contexte du support ? (test de prompt injection simple)
- Forces observées : réponses structurées, en français, adaptées au niveau de l'utilisateur

---

## 8. Limites et risques

**Objectif de la section**  
Présenter honnêtement les limites du système et les risques à considérer avant de déployer un assistant IA de ce type.

**Sources utilisées**
- S4 (NIST AI 600-1) : hallucinations, biais, manque de fiabilité de l'IA générative
- S5 (OWASP Top 10 LLM) : prompt injection, risques de sécurité
- S8 (IBM) : définition des hallucinations (complémentaire)
- S3 (NIST AI RMF) : cadre général de gestion des risques

**Idées à développer**
- Les hallucinations : le modèle peut donner de mauvaises instructions techniques avec confiance
- Les biais : le modèle peut avoir des angles morts selon ses données d'entraînement
- Le prompt injection : un utilisateur peut tenter de manipuler l'assistant
- La dépendance aux ressources matérielles : pas adapté pour une utilisation intensive sans GPU
- La maintenance : les modèles doivent être mis à jour, Ollama doit être géré
- Le modèle n'est pas connecté à internet : ses connaissances ont une date limite (date de coupure)
- Ce n'est pas un remplacement pour un vrai technicien de support : c'est un outil d'aide

---

## 9. Conclusion

**Objectif de la section**  
Faire le bilan du projet, répondre aux objectifs initiaux et proposer des pistes d'amélioration ou d'évolution.

**Sources utilisées**  
Aucune source externe nécessaire. C'est une synthèse personnelle.

**Idées à développer**
- Est-ce que le MVP a été atteint ?
- Ce que j'ai appris : installer Ollama, comprendre l'API, configurer un system prompt, comparer des modèles
- Ce que le projet démontre : il est maintenant possible pour un étudiant de faire tourner un assistant IA privé sur son propre ordinateur
- Pistes d'amélioration : ajouter une base de connaissances locale (RAG), améliorer l'interface, tester d'autres modèles, déployer sur un serveur partagé dans un bureau
- Réflexion finale sur l'avenir des outils IA dans le support informatique

---

## Notes sur le fil conducteur

Le rapport suit une logique en entonnoir :

```
Contexte large (pourquoi l'IA locale ?)
    ↓
Outil spécifique (Ollama)
    ↓
Cas d'usage concret (support informatique)
    ↓
Évaluation critique (limites et risques)
    ↓
Bilan personnel (conclusion)
```

Cette structure garantit que chaque section amène naturellement la suivante, sans rupture de flux.
