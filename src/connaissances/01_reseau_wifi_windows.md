DÉPANNAGE RÉSEAU ET WI-FI SOUS WINDOWS — MANUEL DE SUPPORT

OBJECTIF
Ce document explique comment diagnostiquer et résoudre les problèmes de connexion réseau et Wi-Fi sur Windows 10 et Windows 11. Il suit une démarche de diagnostic du plus simple au plus complexe.

MÉTHODE DE DIAGNOSTIC EN COUCHES
Pour résoudre un problème réseau, on vérifie toujours dans cet ordre : 1) le matériel physique (câble, antenne, routeur), 2) la connexion à la box ou au point d'accès, 3) l'adresse IP attribuée à l'ordinateur, 4) la résolution DNS, 5) l'accès à Internet. En testant couche par couche, on isole rapidement l'origine de la panne.

PROBLÈME : AUCUNE CONNEXION WI-FI, LE RÉSEAU N'APPARAÎT PAS
Causes possibles : le Wi-Fi est désactivé, le mode Avion est actif, ou le pilote de la carte réseau a planté.
Solutions : Vérifier que le bouton Wi-Fi physique ou la touche de fonction (Fn + F2 par exemple) est activé. Ouvrir les paramètres réseau et désactiver le mode Avion. Cliquer sur l'icône réseau dans la barre des tâches et vérifier que le Wi-Fi est sur Activé. Redémarrer le routeur en le débranchant 30 secondes. Si rien n'apparaît, ouvrir le Gestionnaire de périphériques, dérouler Cartes réseau, faire un clic droit sur la carte Wi-Fi et choisir Désactiver puis Activer le périphérique pour relancer le pilote.

PROBLÈME : CONNECTÉ AU WI-FI MAIS PAS D'ACCÈS À INTERNET
C'est le cas le plus fréquent. L'ordinateur reçoit le signal Wi-Fi mais les pages ne se chargent pas. Le message « Connecté, aucun accès Internet » s'affiche.
Causes possibles : adresse IP non valide, cache DNS corrompu, problème côté fournisseur d'accès, ou pile réseau Windows endommagée.
Solution en ligne de commande : Ouvrir l'invite de commandes en tant qu'administrateur. Taper « ipconfig /release » pour libérer l'adresse IP, puis « ipconfig /renew » pour en demander une nouvelle au routeur. Ensuite « ipconfig /flushdns » pour vider le cache DNS. Si le problème persiste, réinitialiser complètement la pile réseau avec ces trois commandes successives : « netsh winsock reset », « netsh int ip reset », puis redémarrer l'ordinateur. Cette réinitialisation Winsock règle la majorité des cas où la connexion est établie mais Internet inaccessible.

PROBLÈME : CONNEXION LENTE OU INSTABLE
Causes possibles : trop d'appareils sur le réseau, interférences, éloignement du routeur, canal Wi-Fi saturé, ou bande de fréquence inadaptée.
Solutions : Se rapprocher du routeur ou réduire le nombre de murs entre l'ordinateur et la box. Privilégier la bande 5 GHz pour la vitesse (portée plus courte) ou la bande 2,4 GHz pour la portée (plus lente, plus encombrée). Redémarrer le routeur pour qu'il choisisse un canal moins saturé. Fermer les applications qui consomment de la bande passante en arrière-plan (mises à jour, téléchargements, streaming). Tester le débit réel pour comparer avec le débit souscrit. Sur un portable, vérifier que le mode d'économie d'énergie ne bride pas la carte Wi-Fi.

PROBLÈME : ADRESSE IP EN 169.254.x.x (APIPA)
Quand Windows affiche une adresse commençant par 169.254, cela signifie que l'ordinateur n'a pas réussi à obtenir d'adresse IP du serveur DHCP du routeur. C'est une adresse d'auto-configuration de secours.
Solutions : Relancer l'obtention d'adresse avec « ipconfig /release » puis « ipconfig /renew ». Vérifier que le serveur DHCP du routeur est actif. Redémarrer le routeur. Vérifier dans les propriétés de la carte réseau (Protocole IPv4) que l'option « Obtenir une adresse IP automatiquement » est bien cochée.

PROBLÈME : LE WI-FI SE DÉCONNECTE TOUT SEUL
Causes possibles : Windows met la carte réseau en veille pour économiser l'énergie, ou le pilote est obsolète.
Solution : Ouvrir le Gestionnaire de périphériques, faire un clic droit sur la carte Wi-Fi, choisir Propriétés, puis l'onglet Gestion de l'alimentation, et décocher « Autoriser l'ordinateur à éteindre ce périphérique pour économiser l'énergie ». Mettre à jour le pilote depuis le site du fabricant de l'ordinateur ou de la carte.

OUTILS DE DIAGNOSTIC EN LIGNE DE COMMANDE
ipconfig /all : affiche toute la configuration réseau (adresse IP, passerelle, DNS, adresse MAC). C'est le premier réflexe pour voir l'état de la connexion.
ping : teste si une machine répond. « ping 127.0.0.1 » teste la carte réseau locale. « ping 192.168.1.1 » teste la liaison avec le routeur (remplacer par l'adresse de la passerelle). « ping 8.8.8.8 » teste l'accès Internet en contactant le DNS public de Google par son adresse IP. « ping google.com » teste en plus la résolution DNS, car il faut traduire le nom en adresse.
Interprétation : si « ping 8.8.8.8 » fonctionne mais pas « ping google.com », le problème vient du DNS. Si le ping vers la passerelle échoue, le problème est entre l'ordinateur et le routeur. Si tout échoue sauf 127.0.0.1, le problème est local à l'ordinateur.
tracert google.com : affiche le chemin des paquets et où ils bloquent.
nslookup google.com : interroge directement le serveur DNS pour vérifier qu'il répond.

CHANGER DE SERVEUR DNS
Si la navigation est lente ou que certains sites ne se chargent pas, changer le DNS aide souvent. Ouvrir les propriétés de la connexion, puis Protocole IPv4, choisir « Utiliser l'adresse de serveur DNS suivante » et entrer 8.8.8.8 et 8.8.4.4 (Google) ou 1.1.1.1 et 1.0.0.1 (Cloudflare). Ces serveurs publics sont souvent plus rapides et fiables que ceux du fournisseur d'accès.

ASSISTANT INTÉGRÉ DE WINDOWS
Windows propose un utilitaire automatique. Faire un clic droit sur l'icône réseau, choisir « Résoudre les problèmes » ou aller dans Paramètres, Réseau et Internet, État, puis Utilitaire de résolution des problèmes réseau. Sous Windows 11, on trouve aussi « Réinitialisation du réseau » qui réinstalle les cartes réseau et remet tous les paramètres à zéro : c'est la solution radicale quand plus rien ne fonctionne.

CHECKLIST RAPIDE
1. Le mode Avion est-il désactivé ? 2. Les autres appareils se connectent-ils au même Wi-Fi ? Si non, le problème vient du routeur ou du fournisseur. 3. Redémarrer le routeur et l'ordinateur. 4. ipconfig /release puis renew puis flushdns. 5. netsh winsock reset et redémarrer. 6. Changer de DNS. 7. Mettre à jour le pilote Wi-Fi. 8. En dernier recours, réinitialisation réseau complète.
