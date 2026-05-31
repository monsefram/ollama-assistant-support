MAINTENANCE ET OPTIMISATION D'UN PC WINDOWS — MANUEL DE SUPPORT

OBJECTIF
Ce document explique comment entretenir un ordinateur Windows pour qu'il reste rapide et fiable : libérer de l'espace disque, accélérer un PC lent, gérer la mémoire, entretenir le matériel et prévenir les pannes.

PROBLÈME : L'ORDINATEUR EST DEVENU LENT
C'est la demande de support la plus fréquente. La lenteur a presque toujours plusieurs causes cumulées.
Causes principales : trop de programmes lancés au démarrage, disque dur saturé, mémoire vive insuffisante, disque mécanique vieillissant, surchauffe, ou logiciel malveillant.
Démarche : Ouvrir le Gestionnaire des tâches (Ctrl + Maj + Échap), onglet Processus, et trier par Processeur, puis par Mémoire et par Disque pour identifier ce qui consomme. Cela montre immédiatement le coupable. Un processus à 100 % de disque en permanence indique souvent un disque mécanique en fin de vie ou une recherche Windows qui s'emballe.

RÉDUIRE LES PROGRAMMES AU DÉMARRAGE
Beaucoup de logiciels se lancent automatiquement avec Windows et ralentissent le démarrage. Ouvrir le Gestionnaire des tâches, onglet Démarrage. La colonne Impact au démarrage indique le poids de chaque programme. Désactiver tout ce qui n'a pas besoin de se lancer automatiquement (lecteurs de musique, logiciels de mise à jour, applications de communication). Ne pas toucher à l'antivirus ni aux pilotes essentiels. Cette seule action accélère nettement le démarrage.

LIBÉRER DE L'ESPACE DISQUE
Un disque système trop plein ralentit Windows. Il faut garder au moins 15 % d'espace libre.
Nettoyage de disque intégré : taper « cleanmgr » dans la recherche, ou aller dans Paramètres, Système, Stockage. Supprimer les fichiers temporaires, le cache, la corbeille et surtout les anciennes installations de Windows (le dossier Windows.old peut occuper plusieurs gigaoctets après une mise à niveau).
Assistant Stockage : dans Paramètres, Système, Stockage, activer l'Assistant Stockage qui supprime automatiquement les fichiers temporaires et vide la corbeille à intervalle régulier.
Désinstaller les logiciels inutilisés : dans Applications et fonctionnalités, trier par taille et retirer ce qui ne sert plus.
Vider les fichiers temporaires : taper « %temp% » dans la boîte Exécuter (Windows + R) et supprimer le contenu du dossier.
Gérer les gros fichiers personnels : déplacer les vidéos, photos et téléchargements volumineux vers un disque externe ou le cloud.

GÉRER LA MÉMOIRE VIVE (RAM)
Si l'ordinateur rame dès qu'on ouvre plusieurs applications ou onglets, la RAM est probablement saturée. Vérifier l'utilisation dans le Gestionnaire des tâches, onglet Performance, Mémoire. Si elle est constamment proche de 100 %, fermer les applications et onglets inutiles. Pour un usage bureautique, 8 Go suffisent ; pour beaucoup d'onglets ou de l'édition, 16 Go sont confortables. Ajouter de la RAM est la mise à niveau matérielle la plus rentable après le SSD.

REMPLACER UN DISQUE DUR PAR UN SSD
Si l'ordinateur a encore un disque dur mécanique (HDD), le remplacer par un SSD est la transformation la plus spectaculaire : démarrage en quelques secondes, applications instantanées. Un SSD n'a pas de pièces mobiles, il est plus rapide, plus silencieux et plus résistant aux chocs. Pour savoir le type de disque, ouvrir le Gestionnaire des tâches, onglet Performance, Disque : le type est indiqué (SSD ou HDD).

ENTRETIEN DU DISQUE
Sur un SSD : ne jamais défragmenter, c'est inutile et cela use le disque. Windows lance automatiquement la commande TRIM qui maintient les performances. Vérifier dans l'outil Optimiser les lecteurs que le SSD est bien reconnu comme tel.
Sur un disque mécanique : la défragmentation réorganise les fichiers et améliore les performances. Windows le fait automatiquement, mais on peut le lancer manuellement via l'outil Défragmenter et optimiser les lecteurs.
Vérification : « chkdsk C: /f » dans une invite de commandes administrateur détecte et répare les erreurs du système de fichiers.

GÉRER LA SURCHAUFFE ET LE BRUIT
Un ordinateur qui chauffe se met à ralentir volontairement pour se protéger (throttling), et les ventilateurs tournent fort.
Causes : poussière accumulée dans les ventilateurs et radiateurs, pâte thermique sèche, ou aération bloquée.
Solutions : Dépoussiérer les grilles d'aération à l'air comprimé, ordinateur éteint et débranché. Ne pas utiliser un portable posé sur un lit ou un coussin qui bouche les aérations. Sur un fixe, ouvrir le boîtier et nettoyer les ventilateurs. Surveiller la température avec un utilitaire dédié ; au-delà de 90 °C sous charge, il y a un problème de refroidissement.

MISES À JOUR ET PILOTES
Garder Windows à jour corrige les failles de sécurité et les bugs. Aller dans Paramètres, Windows Update, et installer les mises à jour. Mettre à jour les pilotes, surtout la carte graphique et la carte réseau, depuis le site du fabricant. Des pilotes obsolètes causent des plantages et des baisses de performance.

PROBLÈME : UNE APPLICATION NE RÉPOND PLUS
Quand un logiciel se fige, ouvrir le Gestionnaire des tâches, sélectionner l'application marquée « Ne répond pas » et cliquer sur Fin de tâche. Si cela arrive souvent avec la même application, la réparer ou la réinstaller depuis Applications et fonctionnalités, et vérifier qu'elle est à jour.

SAUVEGARDER SES DONNÉES
La maintenance inclut la protection des données contre la panne matérielle. Appliquer la règle 3-2-1 : trois copies, deux supports, une hors site. Utiliser l'Historique des fichiers de Windows vers un disque externe, ou une synchronisation cloud. Un disque peut tomber en panne sans prévenir ; seule une sauvegarde à jour protège réellement les fichiers irremplaçables.

CALENDRIER D'ENTRETIEN RECOMMANDÉ
Chaque semaine : redémarrer complètement l'ordinateur pour vider la mémoire. Vérifier que les sauvegardes se font.
Chaque mois : installer les mises à jour Windows, lancer un nettoyage de disque, faire une analyse antivirus complète, désinstaller les logiciels inutilisés.
Tous les trois à six mois : dépoussiérer physiquement l'ordinateur, vérifier l'état du disque, faire le ménage dans les programmes au démarrage.

CHECKLIST POUR UN PC LENT
1. Gestionnaire des tâches : qui consomme le processeur, la mémoire, le disque ? 2. Désactiver les programmes au démarrage inutiles. 3. Libérer de l'espace disque, garder 15 % de libre. 4. Vérifier la RAM, fermer les applications superflues. 5. Analyse antivirus pour écarter une infection. 6. Vérifier la température et dépoussiérer. 7. Mettre à jour Windows et les pilotes. 8. Si le disque est un HDD, envisager un SSD. 9. Redémarrer après chaque changement.
