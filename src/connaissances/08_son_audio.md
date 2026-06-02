PROBLÈMES DE SON ET DE PÉRIPHÉRIQUES AUDIO SOUS WINDOWS — MANUEL DE SUPPORT

OBJECTIF
Ce document explique comment diagnostiquer et résoudre les problèmes de son sous Windows 11 : aucun son, mauvais périphérique de sortie, micro qui ne marche pas, son saccadé. Il couvre les haut-parleurs, le casque (jack et Bluetooth) et le microphone.

MÉTHODE GÉNÉRALE
La plupart des problèmes de son viennent du mauvais périphérique de sortie sélectionné, du volume coupé, ou d'un pilote audio. On vérifie d'abord le volume et le périphérique actif, ensuite le pilote.

PROBLÈME : AUCUN SON NE SORT
Causes possibles : volume coupé, mauvais périphérique de sortie sélectionné, câble débranché, ou pilote audio en panne.
Solutions : Vérifier l'icône de volume dans la barre des tâches (en bas à droite) : le volume n'est pas à zéro et n'est pas en sourdine (pas de croix sur le haut-parleur). Cliquer sur l'icône de volume et vérifier que le bon périphérique de sortie est choisi : c'est l'erreur la plus fréquente, le son part vers un casque ou un écran HDMI au lieu des haut-parleurs. Pour changer : Paramètres (touche Windows + I), Système, Son, et sélectionner le bon périphérique sous Sortie. Vérifier que les haut-parleurs ou le casque sont bien branchés et allumés. Tester avec un autre casque pour isoler le problème.

PROBLÈME : LE BON PÉRIPHÉRIQUE N'APPARAÎT PAS
Causes : périphérique désactivé ou pilote manquant.
Solutions : Aller dans Paramètres, Système, Son, Plus de paramètres de son. Dans la fenêtre qui s'ouvre, faire un clic droit dans la zone vide et cocher « Afficher les périphériques désactivés ». Si le périphérique apparaît grisé, clic droit, Activer. Vérifier aussi dans le Gestionnaire de périphériques (touche Windows + X, Gestionnaire de périphériques), section Contrôleurs audio, vidéo et jeu, qu'aucun périphérique n'a de point d'exclamation.

PROBLÈME : LE CASQUE OU LES ÉCOUTEURS BLUETOOTH NE FONCTIONNENT PAS
Solutions : Vérifier que le Bluetooth est activé : Paramètres, Bluetooth et appareils. Vérifier que le casque est appairé et connecté, pas seulement appairé. Si le son ne sort pas alors que le casque est connecté, le sélectionner manuellement comme périphérique de sortie dans Paramètres, Système, Son. Si le casque a un mode mains-libres et un mode stéréo, choisir le mode stéréo pour la musique (meilleure qualité). En cas de problème, supprimer l'appareil Bluetooth puis le réappairer.

PROBLÈME : LE MICROPHONE NE FONCTIONNE PAS
Causes possibles : micro coupé, mauvais micro sélectionné, ou autorisations bloquées.
Solutions : Vérifier le périphérique d'entrée : Paramètres, Système, Son, section Entrée. Parler dans le micro et observer la barre de volume qui doit bouger. Si plusieurs micros existent, sélectionner le bon. Vérifier les autorisations : Paramètres, Confidentialité et sécurité, Microphone, et s'assurer que l'accès au micro est activé et que l'application concernée (par exemple Teams, Zoom, le navigateur) a la permission. Vérifier qu'aucun interrupteur physique de coupure du micro n'est activé sur le casque. Augmenter le niveau d'entrée si le son est trop faible.

PROBLÈME : SON SACCADÉ, GRÉSILLEMENTS OU COUPURES
Causes possibles : pilote audio obsolète, améliorations audio problématiques, ou interférence Bluetooth.
Solutions : Mettre à jour le pilote audio depuis le Gestionnaire de périphériques ou le site du fabricant. Désactiver les améliorations audio : Paramètres, Système, Son, choisir le périphérique de sortie, et désactiver les effets ou améliorations audio. Pour un casque Bluetooth qui grésille, réduire la distance avec l'ordinateur et éviter les obstacles. Fermer les applications lourdes qui saturent le processeur.

RÉINSTALLER OU RELANCER LE PILOTE AUDIO
Quand le son a complètement disparu après une mise à jour : ouvrir le Gestionnaire de périphériques (touche Windows + X), dérouler Contrôleurs audio, vidéo et jeu, clic droit sur le périphérique audio, Désinstaller l'appareil, puis redémarrer l'ordinateur. Windows réinstalle automatiquement le pilote au démarrage. On peut aussi choisir Mettre à jour le pilote pour chercher une version plus récente.

OUTIL AUTOMATIQUE DE WINDOWS
Faire un clic droit sur l'icône de volume dans la barre des tâches puis choisir « Résoudre les problèmes de son », ou aller dans Paramètres, Système, Résolution des problèmes, Autres utilitaires de résolution des problèmes, puis lancer celui de l'Audio. Il détecte la plupart des problèmes de périphérique et de volume.

CHECKLIST RAPIDE
1. Le volume n'est ni à zéro ni en sourdine. 2. Le bon périphérique de sortie est sélectionné (erreur la plus fréquente). 3. Câble branché ou Bluetooth connecté. 4. Tester un autre casque. 5. Pour le micro : vérifier le périphérique d'entrée et les autorisations. 6. Lancer l'utilitaire de dépannage audio. 7. Réinstaller le pilote audio si le son a disparu après une mise à jour.
