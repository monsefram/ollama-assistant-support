SÉCURITÉ INFORMATIQUE ET PROTECTION CONTRE LES VIRUS — MANUEL DE SUPPORT

OBJECTIF
Ce document explique comment reconnaître une infection, en nettoyer un ordinateur Windows, et adopter les bonnes pratiques pour éviter les logiciels malveillants. Il vise les utilisateurs et le support de premier niveau.

LES TYPES DE LOGICIELS MALVEILLANTS
Virus : programme qui s'attache à un fichier et se propage quand on l'exécute.
Ver : se propage seul sur le réseau sans action de l'utilisateur.
Cheval de Troie : se fait passer pour un logiciel légitime mais cache une fonction malveillante.
Rançongiciel (ransomware) : chiffre les fichiers et exige une rançon pour les déverrouiller. C'est aujourd'hui la menace la plus coûteuse.
Logiciel espion (spyware) : collecte des informations à l'insu de l'utilisateur (mots de passe, habitudes).
Logiciel publicitaire (adware) : affiche des publicités intrusives et détourne le navigateur.
Enregistreur de frappe (keylogger) : enregistre tout ce qui est tapé au clavier pour voler les identifiants.

SIGNES QU'UN ORDINATEUR EST INFECTÉ
L'ordinateur est soudainement très lent sans raison. Des fenêtres publicitaires apparaissent même sans navigateur ouvert. La page d'accueil ou le moteur de recherche du navigateur a changé tout seul. Des programmes inconnus se sont installés. L'antivirus est désactivé et refuse de se rallumer. Des fichiers ont disparu, sont renommés avec une extension étrange, ou portent une demande de rançon. Le ventilateur tourne à fond en permanence (minage caché). Des amis reçoivent des messages que l'on n'a pas envoyés. La connexion Internet est saturée sans raison.

PROCÉDURE DE NETTOYAGE D'UN ORDINATEUR INFECTÉ
Étape 1 : Déconnecter l'ordinateur d'Internet pour stopper la propagation et la communication avec le serveur de l'attaquant. Débrancher le câble réseau ou couper le Wi-Fi.
Étape 2 : Démarrer en mode sans échec avec réseau si possible. Beaucoup de logiciels malveillants ne se chargent pas en mode sans échec, ce qui facilite leur suppression.
Étape 3 : Lancer une analyse complète avec l'antivirus intégré. Ouvrir la Sécurité Windows, aller dans Protection contre les virus et menaces, Options d'analyse, choisir Analyse complète. Pour les menaces tenaces, utiliser l'Analyse hors ligne de Microsoft Defender, qui redémarre l'ordinateur et analyse avant le chargement de Windows.
Étape 4 : Compléter avec un second outil de désinfection spécialisé, car aucun antivirus ne détecte tout. Un scanner anti-programmes malveillants à la demande trouve souvent ce que l'antivirus principal a manqué.
Étape 5 : Vérifier les programmes installés récemment dans Applications et fonctionnalités, et désinstaller tout ce qui est inconnu ou suspect.
Étape 6 : Réinitialiser les navigateurs pour supprimer les extensions malveillantes et remettre la page d'accueil et le moteur de recherche par défaut.
Étape 7 : Changer tous les mots de passe importants depuis un autre appareil sain, surtout la messagerie et les comptes bancaires, car ils ont pu être volés.
Étape 8 : Si l'infection est un rançongiciel ou si le nettoyage échoue, la solution la plus sûre est de sauvegarder les données saines et de réinstaller Windows proprement.

CAS PARTICULIER : RANÇONGICIEL
Si les fichiers sont chiffrés et qu'une demande de rançon s'affiche, ne jamais payer : rien ne garantit la récupération et cela finance les criminels. Déconnecter immédiatement la machine du réseau pour éviter que le chiffrement se propage aux disques partagés. Noter le nom du rançongiciel affiché. Restaurer les fichiers depuis une sauvegarde si elle existe. C'est exactement la situation où les sauvegardes régulières font toute la différence.

MICROSOFT DEFENDER : L'ANTIVIRUS INTÉGRÉ
Windows 10 et 11 incluent Microsoft Defender, un antivirus gratuit et efficace activé par défaut. Il n'est pas nécessaire d'installer un autre antivirus payant pour un usage normal ; un deuxième antivirus actif en permanence cause souvent des conflits et ralentit la machine. Vérifier que la Protection en temps réel est activée dans la Sécurité Windows. Maintenir Windows à jour met aussi à jour les définitions de virus.

LE PARE-FEU
Le pare-feu contrôle les connexions entrantes et sortantes. Le pare-feu Windows Defender est activé par défaut et doit le rester. Il bloque les tentatives de connexion non autorisées depuis l'extérieur. Ne le désactiver que temporairement et pour une raison précise.

LES BONNES PRATIQUES DE PRÉVENTION
Maintenir Windows et les logiciels à jour : la plupart des infections exploitent des failles déjà corrigées. Activer les mises à jour automatiques.
Se méfier des courriels : ne pas ouvrir les pièces jointes inattendues, ne pas cliquer sur les liens dans les messages suspects. L'hameçonnage (phishing) imite des organismes de confiance pour voler les identifiants. Vérifier l'adresse réelle de l'expéditeur et survoler les liens avant de cliquer.
Télécharger uniquement depuis des sources officielles : éviter les sites de cracks et de logiciels piratés, principaux vecteurs d'infection.
Utiliser des mots de passe forts et uniques : au moins douze caractères mélangeant majuscules, minuscules, chiffres et symboles. Un gestionnaire de mots de passe permet d'en avoir un différent par site sans les mémoriser.
Activer l'authentification à deux facteurs sur les comptes importants : même si le mot de passe est volé, le second facteur bloque l'accès.
Faire des sauvegardes régulières selon la règle 3-2-1 : trois copies des données, sur deux supports différents, dont une hors site ou hors ligne. C'est la seule protection vraiment fiable contre les rançongiciels.
Verrouiller la session quand on s'éloigne de l'ordinateur (Windows + L).
Ne pas utiliser de compte administrateur au quotidien : un compte standard limite les dégâts qu'un programme malveillant peut causer.

RECONNAÎTRE UNE ARNAQUE DE FAUX SUPPORT TECHNIQUE
Une fenêtre alarmante annonce que l'ordinateur est infecté et affiche un numéro à appeler. C'est une arnaque : aucun éditeur sérieux n'affiche de numéro de téléphone dans une alerte. Ne jamais appeler, ne jamais donner l'accès à distance, ne jamais communiquer de coordonnées bancaires. Fermer le navigateur, au besoin via le Gestionnaire des tâches, et lancer une analyse antivirus.

CHECKLIST RAPIDE EN CAS D'INFECTION
1. Déconnecter du réseau. 2. Mode sans échec. 3. Analyse complète avec Microsoft Defender. 4. Analyse hors ligne et second scanner. 5. Désinstaller les programmes suspects. 6. Réinitialiser les navigateurs. 7. Changer les mots de passe depuis un appareil sain. 8. Restaurer depuis une sauvegarde ou réinstaller si nécessaire.
