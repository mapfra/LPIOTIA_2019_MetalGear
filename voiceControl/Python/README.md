Partie faite par : Hervé Louis & Stéphane Azoulay

Pour faire fonctionner correctement la Respeaker suivez ce tutoriel officiel du constructeur jusqu'au "Step 6" :
- https://wiki.seeedstudio.com/ReSpeaker_4_Mic_Array_for_Raspberry_Pi/

Ensuite, il vous faudra générer une clé API Bing chez AZURE.

Pour info, si vous souhaitez en tant qu'étudiant, vous pouvez vous créer un compte AZURE gratuitement et utiliser le service mais il ne sera
valable qu'un mois gratuitement pendant 5 heures d'utilisation maximale et il sera necessaire de lier votre carte bancaire
à votre compte AZURE.

PS: Aucun prélevement automatique n'aura lieux pendant le mois d'essai ni même après si vous n'enlevez pas votre carte
bancaire de votre compte.

Une fois que vous avez votre compte et que vous avez lié votre carte bancaire vous pourrez utiliser le service Bing : Speech To Text
ainsi, une clé API vous sera délivré sur votre compte AZURE.

Pour obtenir une clé API, il faudra vous rendre ici :
- https://azure.microsoft.com/fr-fr/services/cognitive-services/speech-services/

Afin que le script fonctionne correctement, ouvrez le script voice_recognition.py et modifiez la varaible "BING_KEY" et attribuez lui la
valeur de votre clé API reçue sur votre compte AZURE.

Ainsi, le script devrait fonctionner automatiquement désormais.

PS: AZURE vous délivrera deux clés API vous pouvez utiliser celle que vous voulez, les deux sont valables.

Pour executer le script vous aurez besoin d'executer les commandes suivantes :

- cd Destop/LPIOTIA_2019_MetalGear/voiceControl/Python
- python voice_recognition.py

PS: Vous pouvez parler à 60 CM du microphone de la respeaker et même un peu plus, celà devrait fonctionner donc, il n'est pas necessaire que votre bouche soit très proche du microphone.

Le terminal va afficher des erreurs ALSA puis vous attendez 4 secondes environ et commencez à parler à côté du microphone de
votre respeaker.

Donc, si tout se passe bien vous devriez avoir dans votre terminal : "Recognized :" + ce que vous dites à haute voix

Ainsi, si vous dites par exemple : "ok hexapod, avance de trente centimètres" il devrait envoyer un ping au bon URL de l'API de Flavien
avec les bonnes données avec la quantité de mouvement (en cm) donc : qty = 30 dans notre cas.

Donc dans le terminal vous aurez : "Recognized : ok hexapod, avance de trente centimètres".

Comment être sur que l'API fonctionne correctement ?

- Si tout se passe bien, l'API de flavien devrait renvoyer une <[RESPONSE]: 200> et dans le cas contraire une erreur du script python
qui ne parvient pas à pinger l'url de l'API car elle est éteinte probablement.

PS : La librairie officielle n'étant pas à jour il ne faut pas toucher à l'appel de la librairie BingSpeechAPI car elle a été modifiée
pour que la reconnaissance vocale puisse fonctionner convenablement.
