Partie faite par : Hervé Louis

Alors vous vous demandez déjà pourquoi le fichier n'a pas d'extension ?

C'est bel est bien un fichier python mais il ne possède pas d'extension car il est conçu pour être considéré comme une ligne
de commande par la raspberry.

En fait le but est d'ouvrir un terminal au hasard et de taper la commande hexapod -t "movement/foward" -q 20
par exemple et que le terminal lance le script automatiquement.

Comme ça l'API de Flavien peut écrire dans un terminal quelconque la commande hexapode et le terminal saura ou aller chercher le script
dans la raspberry.

Ok mais que faire du fichier sans extension "hexapod" ?

- il faut aller dans le dossier du projet et venir ici même et exporter le fichier dans le dossier /bin de la raspberry.

Ce qui donne dans le terminal :

- cd Desktop/LPIOTIA_2019_MetalGear/broker
- chmod +x hexapod
- cp hexapod ~/bin
- export PATH=$PATH":$HOME/bin"

PS: Chmod +x permet de lancer l'execution du fichier sans avoir besoin de faire un sudo.

Suite à celà, vous pourrez tester en ouvrant un nouveau terminal de taper la commande hexapod -t "movement/foward" -q 20
et vous aurez un [timeoutError] car le broker n'aura pas réussi à se connecter à l'hexapod en wifi.

Allumez donc votre hexapod et connectez vous en wifi ad hoc via la raspberry au SSID Freenove et re-lancez
la commande hexapod dans un terminal.
