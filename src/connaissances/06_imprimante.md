PROBLÈMES D'IMPRIMANTE SOUS WINDOWS — MANUEL DE SUPPORT

OBJECTIF
Ce document explique comment diagnostiquer et résoudre les problèmes d'imprimante les plus fréquents sous Windows 11 : imprimante non détectée, impression bloquée, bourrage papier, mauvaise qualité. Il couvre les imprimantes USB, Wi-Fi et réseau.

MÉTHODE GÉNÉRALE
La plupart des problèmes d'impression viennent de trois sources : la connexion (câble ou réseau), la file d'attente d'impression bloquée, ou le pilote. On vérifie toujours dans cet ordre : l'imprimante est-elle allumée et connectée, la file d'attente est-elle bloquée, le pilote est-il correct.

PROBLÈME : L'IMPRIMANTE N'EST PAS DÉTECTÉE
Causes possibles : câble débranché, imprimante éteinte, mauvaise connexion Wi-Fi, ou pilote absent.
Solutions : Vérifier que l'imprimante est allumée et qu'aucun voyant d'erreur ne clignote. Pour une imprimante USB, tester un autre port USB et un autre câble. Pour une imprimante Wi-Fi, vérifier qu'elle est connectée au même réseau que l'ordinateur. Ajouter l'imprimante manuellement : Paramètres (touche Windows + I), Bluetooth et appareils, Imprimantes et scanners, Ajouter un appareil. Si elle n'apparaît pas, cliquer sur « L'imprimante que je veux n'est pas dans la liste » pour une recherche avancée. Redémarrer à la fois l'imprimante et l'ordinateur résout souvent une détection capricieuse.

PROBLÈME : L'IMPRESSION RESTE BLOQUÉE DANS LA FILE D'ATTENTE
Les documents s'accumulent et rien ne s'imprime, même après avoir relancé.
Cause : le spouleur d'impression (service Windows qui gère la file) est bloqué.
Solution simple : Ouvrir Paramètres, Bluetooth et appareils, Imprimantes et scanners, choisir l'imprimante, Ouvrir la file d'attente, puis annuler tous les documents en attente.
Solution complète (redémarrer le spouleur) : Ouvrir les Services (touche Windows + R, taper services.msc, Entrée). Trouver « Spouleur d'impression » dans la liste, clic droit, Arrêter. Ensuite, dans l'Explorateur de fichiers, aller dans C:\Windows\System32\spool\PRINTERS et supprimer tous les fichiers de ce dossier (ce sont les travaux d'impression coincés). Revenir aux Services, clic droit sur Spouleur d'impression, Démarrer. La file est alors vidée et l'impression repart.

PROBLÈME : BOURRAGE PAPIER
Un message signale un bourrage et l'impression s'arrête.
Solutions : Éteindre l'imprimante avant de manipuler le papier. Ouvrir les capots et retirer délicatement le papier coincé en tirant dans le sens du chemin du papier, jamais à contresens, pour ne pas laisser de morceaux. Vérifier qu'il ne reste aucun fragment. Vérifier que le papier dans le bac n'est pas froissé, humide ou en quantité excessive. Bien aligner la pile de papier contre les guides. Rallumer l'imprimante : elle reprend généralement le travail.

PROBLÈME : MAUVAISE QUALITÉ D'IMPRESSION
Traces, bandes claires, couleurs incorrectes ou texte pâle.
Causes possibles : niveau d'encre ou de toner bas, têtes d'impression encrassées (jet d'encre), ou cartouche en fin de vie.
Solutions : Vérifier les niveaux d'encre ou de toner dans le logiciel de l'imprimante. Pour une imprimante jet d'encre, lancer la fonction de nettoyage des têtes d'impression depuis le logiciel ou le menu de l'imprimante, puis imprimer une page de test. Répéter le nettoyage une à deux fois si nécessaire. Vérifier que l'on utilise le bon type de papier. Si les bandes persistent malgré le nettoyage, la cartouche est probablement à remplacer.

PROBLÈME : L'IMPRIMANTE IMPRIME DES PAGES INCORRECTES OU DES CARACTÈRES ÉTRANGES
Causes : pilote corrompu ou inadapté.
Solution : Réinstaller le pilote. Retirer l'imprimante dans Paramètres, Bluetooth et appareils, Imprimantes et scanners, choisir l'imprimante, Supprimer. Puis télécharger le pilote le plus récent depuis le site officiel du fabricant (HP, Canon, Epson, Brother) et le réinstaller. Éviter les pilotes génériques quand un pilote officiel existe.

PROBLÈME : IMPRIMANTE WI-FI QUI SE DÉCONNECTE
Causes : imprimante trop loin du routeur, adresse IP changée, ou veille de l'imprimante.
Solutions : Rapprocher l'imprimante du routeur ou améliorer la couverture Wi-Fi. Attribuer une adresse IP fixe à l'imprimante depuis l'interface du routeur pour qu'elle ne change pas. Désactiver le mode veille profonde de l'imprimante dans ses réglages. Réinstaller l'imprimante si l'adresse a changé.

OUTIL AUTOMATIQUE DE WINDOWS
Windows propose un utilitaire de dépannage dédié : Paramètres, Système, Résolution des problèmes, Autres utilitaires de résolution des problèmes, puis lancer celui de l'Imprimante. Il détecte et corrige automatiquement les problèmes courants de spouleur et de connexion.

IMPRIMER EN PDF SANS IMPRIMANTE
Windows 11 inclut « Microsoft Print to PDF » comme imprimante virtuelle. Dans n'importe quelle boîte d'impression, choisir Microsoft Print to PDF pour enregistrer le document en fichier PDF au lieu de l'imprimer. Utile quand l'imprimante physique est en panne.

CHECKLIST RAPIDE
1. L'imprimante est-elle allumée, sans voyant d'erreur ? 2. Câble bien branché ou Wi-Fi sur le bon réseau ? 3. Vider la file d'attente d'impression. 4. Redémarrer le spouleur d'impression (services.msc). 5. Redémarrer imprimante et ordinateur. 6. Lancer l'utilitaire de dépannage Windows. 7. Réinstaller le pilote officiel si les pages sont incorrectes. 8. Nettoyer les têtes si la qualité est mauvaise.
