PROBLÈMES DE NAVIGATEUR WEB — MANUEL DE SUPPORT

OBJECTIF
Ce document explique comment résoudre les problèmes courants des navigateurs web (Chrome, Edge, Firefox) sous Windows : navigateur lent, pages qui ne se chargent pas, cache à vider, extensions problématiques, page d'accueil détournée. La plupart des solutions sont valables pour tous les navigateurs, avec des chemins légèrement différents.

MÉTHODE GÉNÉRALE
Quand un navigateur pose problème, l'ordre de diagnostic est : vider le cache, tester en navigation privée pour écarter les extensions, désactiver les extensions suspectes, puis réinitialiser le navigateur en dernier recours.

PROBLÈME : LE NAVIGATEUR EST LENT
Causes possibles : trop d'onglets ouverts, cache saturé, trop d'extensions, ou trop de processus en arrière-plan.
Solutions : Fermer les onglets inutilisés, car chaque onglet consomme de la mémoire. Vider le cache et les données de navigation (voir plus bas). Désactiver ou supprimer les extensions inutiles. Mettre le navigateur à jour : un navigateur à jour est plus rapide et plus sûr. Redémarrer le navigateur complètement. Vérifier dans le Gestionnaire des tâches (Ctrl + Maj + Échap) si le navigateur consomme énormément de mémoire ; si oui, réduire les onglets et les extensions.

VIDER LE CACHE ET LES DONNÉES DE NAVIGATION
Le cache stocke des éléments des sites pour accélérer le chargement, mais un cache corrompu cause des pages cassées ou anciennes.
Raccourci universel : dans Chrome, Edge ou Firefox, appuyer sur Ctrl + Maj + Suppr pour ouvrir directement la fenêtre d'effacement des données. Choisir la période (par exemple « Tout »), cocher au minimum « Images et fichiers en cache », puis confirmer. Cocher aussi les cookies si un site refuse de fonctionner ou de se connecter, mais attention : cela déconnecte des sites.
Effet : vider le cache résout beaucoup de problèmes d'affichage, de connexion à un site, ou de page qui reste figée sur une ancienne version.

PROBLÈME : UNE PAGE NE SE CHARGE PAS OU AFFICHE UNE ERREUR
Causes possibles : problème réseau, cache corrompu, extension qui bloque, ou problème côté site.
Solutions : Tester si d'autres sites se chargent. Si aucun site ne charge, le problème est réseau (voir le manuel réseau). Recharger en forçant le contournement du cache avec Ctrl + Maj + R. Tester la page en navigation privée (Ctrl + Maj + N dans Chrome et Edge, Ctrl + Maj + P dans Firefox) : si elle marche en privé, le problème vient d'une extension ou du cache. Vérifier l'heure et la date du système, car une horloge fausse casse les certificats de sécurité (erreurs HTTPS). Désactiver temporairement le VPN ou le proxy s'il y en a un.

PROBLÈME : EXTENSIONS PROBLÉMATIQUES
Une extension peut ralentir le navigateur, injecter de la publicité ou détourner les recherches.
Tester : ouvrir une fenêtre de navigation privée, où les extensions sont désactivées par défaut. Si tout fonctionne normalement, une extension est en cause.
Gérer les extensions : dans Chrome, aller à l'adresse des extensions via le menu, Extensions, Gérer les extensions. Dans Edge, menu, Extensions. Dans Firefox, menu, Modules complémentaires et thèmes. Désactiver les extensions une par une pour trouver la coupable, puis supprimer celles qui sont inconnues ou non désirées.

PROBLÈME : PAGE D'ACCUEIL OU MOTEUR DE RECHERCHE DÉTOURNÉ
La page d'accueil, la page de nouvel onglet ou le moteur de recherche a changé sans action volontaire. C'est souvent le signe d'une extension malveillante ou d'un logiciel publicitaire.
Solutions : Supprimer les extensions suspectes (voir ci-dessus). Rétablir le moteur de recherche : dans les paramètres du navigateur, section Moteur de recherche, choisir celui voulu (Google, Bing) et supprimer les moteurs inconnus. Rétablir la page de démarrage dans les paramètres, section Au démarrage. Lancer une analyse antivirus, car un détournement de navigateur accompagne souvent un logiciel publicitaire installé sur le système.

RÉINITIALISER LE NAVIGATEUR (DERNIER RECOURS)
Quand rien d'autre ne fonctionne, réinitialiser remet les paramètres par défaut sans supprimer les favoris ni les mots de passe enregistrés.
Chrome : Paramètres, Réinitialiser les paramètres, Restaurer les paramètres par défaut.
Edge : Paramètres, Réinitialiser les paramètres, Rétablir les valeurs par défaut.
Firefox : menu, Aide, Informations de dépannage, bouton Réparer Firefox.
Cela désactive les extensions et remet les moteurs et pages par défaut, tout en gardant les favoris.

CHANGER LE NAVIGATEUR PAR DÉFAUT
Sous Windows 11 : Paramètres (touche Windows + I), Applications, Applications par défaut, taper le nom du navigateur voulu, cliquer dessus, puis cliquer sur Définir par défaut. Il n'y a pas de case à cocher suivie d'un bouton OK comme dans les anciennes versions de Windows.

BONNES PRATIQUES
Garder le navigateur à jour (les mises à jour corrigent les failles de sécurité). N'installer que des extensions de sources fiables et en nombre limité. Vider le cache de temps en temps si l'affichage devient capricieux. Se méfier des extensions qui demandent l'accès à « toutes les données des sites web » sans raison claire.

CHECKLIST RAPIDE
1. Fermer les onglets inutiles et redémarrer le navigateur. 2. Vider le cache avec Ctrl + Maj + Suppr. 3. Tester en navigation privée pour écarter les extensions. 4. Désactiver les extensions suspectes. 5. Forcer le rechargement avec Ctrl + Maj + R. 6. Vérifier l'heure du système pour les erreurs HTTPS. 7. Réinitialiser le navigateur en dernier recours. 8. Analyse antivirus si la page d'accueil est détournée.
