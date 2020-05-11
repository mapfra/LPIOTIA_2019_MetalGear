# Project Voice Controled Hexapod (VCH métal gear)
___
## Aperçu
Ce projet est sur le point de pouvoir contrôler le [freenove hexapod] (https://github.com/Freenove/Freenove_Hexapod_Robot_Kit) par la voix en utilisant le [ReSpeaker] (http://wiki.seeedstudio.com/ReSpeaker/) monté sur une Raspberry pi 3 et une CLI personnalisée.

Pour ce faire, ce projet contient le code d'une CLI personnalisée dans le dossier * "broker" *, le code de l'hexapode freenove dans * "arduino" *, le code du ReSpeaker dans * "voiceControl" *, le nœud Micro service REST dans * "serveur" * et le code web / mobile dans * "web_mobile" *.

La CLI personnalisée sera hébergée avec le serveur de nœuds (micro-service REST basé sur Node.js avec [express] (https://www.npmjs.com/package/express) et le démon ReSpeaker de contrôle vocal (basé sur python).
Tous les trois communiqueront via le serveur de coordination qui analysera toutes les commandes demandées et demandera à la CLI personnalisée de contrôler à distance l'hexapode freenove via wifi. (notez que le raspberry pi 3 et l'hexapode freenove doivent être configurés sur le même réseau pour pouvoir communiquer)

L'application Web et mobile affichera le journal des événements et des graphiques sur l'hexapode freenove pour suivre l'évolution et les métriques du robot, l'application mobile pourra spécifiquement contrôler l'hexapode freenove.

___
## Installation

Comme expliqué précédemment, le serveur de noeud, la CLI personnalisée et le démon ReSpeaker doivent être installés sur le raspberry pi 3, le code arduino doit être téléchargé sur l'hexapode freenove et les applications Web et mobiles peuvent être installées sur n'importe quel appareil final. (Les spécifications de chaque projet peuvent être trouvées dans leurs dossiers respectifs)

___
## Evolutions

 * Une caméra pourrait être installée sur l'hexapode freenove pour avoir un flux de diffusion OTT
 * Le raspberry pi 3 et l'hexapode freenove peuvent être installés sur un VPN afin qu'ils n'aient pas à être sur le même réseau ni à portée l'un de l'autre
 * L'application mobile pourrait avoir un système de reconnaissance vocale pour contrôler à distance l'hexapode freenove à l'aide de la voix