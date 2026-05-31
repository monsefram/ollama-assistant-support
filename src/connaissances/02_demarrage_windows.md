PROBLÈMES DE DÉMARRAGE DE WINDOWS — MANUEL DE SUPPORT

OBJECTIF
Ce document explique comment diagnostiquer et réparer un ordinateur Windows 10 ou 11 qui ne démarre pas, démarre lentement, ou reste bloqué. On distingue trois grandes familles : l'ordinateur ne s'allume pas du tout, Windows ne se charge pas, ou Windows démarre mais plante.

PROBLÈME : L'ORDINATEUR NE S'ALLUME PAS DU TOUT
Aucun voyant, aucun ventilateur, écran noir total.
Causes possibles : alimentation débranchée, batterie à plat, bloc d'alimentation défaillant, ou problème matériel.
Solutions : Vérifier que le câble d'alimentation est bien branché des deux côtés et que la multiprise est allumée. Sur un portable, brancher le chargeur et attendre quelques minutes même si la batterie est totalement vide. Tester une autre prise murale. Débrancher tous les périphériques USB. Sur un fixe, vérifier l'interrupteur à l'arrière du bloc d'alimentation. Faire un reset électrique : débrancher tout, retirer la batterie si elle est amovible, maintenir le bouton d'alimentation enfoncé 30 secondes pour décharger les condensateurs, puis rebrancher et rallumer.

PROBLÈME : L'ORDINATEUR S'ALLUME MAIS L'ÉCRAN RESTE NOIR
Les ventilateurs tournent, les voyants s'allument, mais rien n'apparaît à l'écran.
Causes possibles : problème d'affichage, écran externe mal détecté, ou RAM mal positionnée.
Solutions : Vérifier la luminosité et que l'écran est allumé. Sur un portable, faire la combinaison Windows + Ctrl + Maj + B qui réinitialise le pilote graphique. Brancher un écran externe pour savoir si le problème vient de la dalle ou de la carte graphique. Sur un fixe, vérifier le câble vidéo et qu'il est branché sur la carte graphique et non sur la sortie de la carte mère. Réinsérer les barrettes de RAM si on est à l'aise avec le matériel.

PROBLÈME : MESSAGE « NO BOOT DEVICE » OU « OPERATING SYSTEM NOT FOUND »
Le BIOS ne trouve pas de disque sur lequel démarrer.
Causes possibles : ordre de démarrage incorrect dans le BIOS, disque dur débranché ou défaillant, ou secteur de démarrage corrompu.
Solutions : Entrer dans le BIOS au démarrage (touche Suppr, F2, F10 ou F12 selon le fabricant) et vérifier que le disque système apparaît bien dans la liste des périphériques. Vérifier l'ordre de démarrage pour que le disque système soit en premier. Si le disque n'apparaît pas du tout, il peut être débranché ou en panne. Si le disque est détecté mais Windows ne démarre pas, il faut réparer le démarrage (voir plus bas).

PROBLÈME : WINDOWS RESTE BLOQUÉ SUR LE LOGO OU TOURNE EN BOUCLE
Le logo Windows et le cercle qui tourne restent affichés indéfiniment, ou l'ordinateur redémarre sans cesse.
Solution avec l'environnement de récupération (WinRE) : Si Windows échoue à démarrer trois fois de suite, il lance automatiquement les options de récupération. On peut aussi le forcer en éteignant l'ordinateur avec le bouton d'alimentation pendant le chargement, trois fois de suite. Dans le menu de récupération, choisir Dépannage, puis Options avancées.
Dans les Options avancées : « Réparation du démarrage » tente une réparation automatique. « Restauration du système » revient à un point de restauration antérieur si l'option était activée. « Désinstaller les mises à jour » retire une mise à jour récente qui empêche le démarrage.

PROBLÈME : ÉCRAN BLEU AU DÉMARRAGE (BSOD)
L'écran bleu affiche un message d'erreur et un code (par exemple INACCESSIBLE_BOOT_DEVICE, CRITICAL_PROCESS_DIED, ou DRIVER_IRQL_NOT_LESS_OR_EQUAL).
Causes possibles : pilote défectueux, mise à jour ratée, fichier système corrompu, ou matériel défaillant (souvent la RAM ou le disque).
Solutions : Noter le code d'erreur pour orienter le diagnostic. Démarrer en mode sans échec (voir plus bas) pour désinstaller le dernier pilote ou la dernière application installée. Lancer une réparation des fichiers système. Si l'erreur mentionne le démarrage ou le disque, vérifier le disque dur.

DÉMARRER EN MODE SANS ÉCHEC
Le mode sans échec charge Windows avec le minimum de pilotes, ce qui permet de réparer quand un pilote ou un logiciel bloque le démarrage normal.
Méthode : Dans l'environnement de récupération, aller dans Dépannage, Options avancées, Paramètres, Redémarrer, puis appuyer sur la touche 4 ou F4 pour le mode sans échec, ou 5 pour le mode sans échec avec réseau. Une fois dedans, on peut désinstaller un pilote, supprimer un logiciel problématique, ou lancer une analyse antivirus.

RÉPARER LES FICHIERS SYSTÈME CORROMPUS
Quand Windows démarre mais se comporte mal, ou depuis l'invite de commandes de récupération, deux outils réparent les fichiers système.
SFC : ouvrir l'invite de commandes en administrateur et taper « sfc /scannow ». L'outil vérifie tous les fichiers protégés de Windows et remplace ceux qui sont corrompus. L'analyse prend plusieurs minutes.
DISM : si SFC ne suffit pas, taper « DISM /Online /Cleanup-Image /RestoreHealth ». Cet outil répare l'image système de Windows en téléchargeant les fichiers sains. On lance généralement DISM d'abord, puis SFC ensuite.

RÉPARER LE SECTEUR DE DÉMARRAGE
Si le chargeur de démarrage est endommagé, depuis l'invite de commandes de récupération, taper successivement : « bootrec /fixmbr » (répare l'enregistrement de démarrage principal), « bootrec /fixboot » (écrit un nouveau secteur de démarrage), « bootrec /scanos » (cherche les installations Windows), et « bootrec /rebuildbcd » (reconstruit les données de configuration de démarrage). Ces commandes règlent la plupart des erreurs de démarrage logiciel.

PROBLÈME : DÉMARRAGE TRÈS LENT
Windows démarre mais met très longtemps.
Causes possibles : trop de programmes au démarrage, disque dur mécanique saturé, ou démarrage rapide problématique.
Solutions : Ouvrir le Gestionnaire des tâches (Ctrl + Maj + Échap), onglet Démarrage, et désactiver les programmes inutiles ayant un impact élevé. Vérifier l'espace libre sur le disque système (il faut au moins 15 % de libre). Si l'ordinateur a encore un disque dur mécanique, le remplacer par un SSD est la mise à niveau qui change le plus l'expérience. Désactiver puis réactiver le démarrage rapide dans les options d'alimentation peut régler certains blocages.

VÉRIFIER L'ÉTAT DU DISQUE DUR
Un disque défaillant cause des démarrages lents, des plantages et des écrans bleus. Ouvrir l'invite de commandes en administrateur et taper « chkdsk C: /f /r » pour vérifier et réparer le disque système ; comme il est en cours d'utilisation, la vérification se fera au prochain redémarrage. La commande « wmic diskdrive get status » affiche l'état de santé global du disque (OK ou Pred Fail).

CHECKLIST RAPIDE
1. L'ordinateur reçoit-il du courant ? Voyants, ventilateurs. 2. Reset électrique : tout débrancher, maintenir le bouton 30 secondes. 3. Écran externe pour isoler l'affichage. 4. BIOS : le disque est-il détecté ? Bon ordre de démarrage ? 5. Forcer la récupération en coupant trois fois pendant le chargement. 6. Réparation du démarrage automatique. 7. Mode sans échec pour annuler un pilote ou une mise à jour récente. 8. SFC et DISM pour les fichiers système. 9. chkdsk pour le disque. 10. En dernier recours, restauration ou réinstallation.
