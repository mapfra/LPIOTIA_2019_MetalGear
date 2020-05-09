# Project Voice Controled Hexapod (VCH metal gear)
___
## Overview
This project is about to be able to control the [freenove hexapod](https://github.com/Freenove/Freenove_Hexapod_Robot_Kit) by voice using the [ReSpeaker](http://wiki.seeedstudio.com/ReSpeaker/) mounted on a raspberry pi 3 and a custom CLI.

To do so, this project is containing the code for a custom CLI in the folder *"broker"*, the code for the freenove hexapod in *"arduino"*, the code for the ReSpeaker in *"voiceControl"*, the node REST micro service in *"server"* and the web/mobile code in *"web_mobile"*.

The custom CLI will be hosted along node server (REST micro service based on Node.js with [express](https://www.npmjs.com/package/express) and the voice control ReSpeaker daemon (based on python).
All three of them will be communicating via the coordination Server who will parse all the requested commands and ask the custom CLI to remote control the freenove hexapod over wifi. (note that the raspberry pi 3 and the freenove hexapod have to be set on the same network to be able to communicate)

The web and mobile application will show the event log and charts about the freenove hexapod to follow the evolution and metrics of the robot, the mobile app will specifically be able to control the freenove hexapod.

___
## Installation

As explained before, the node server, the custom CLI and the ReSpeaker daemon need to be installed on the raspberry pi 3, the arduino code needs to be uploaded on the freenove hexapod and the web and mobile applications can be installed on any end device. (Specifications for each projects can be found in their respective forlders)

___
## Evolutions

 * A camera could be installed on the freenove hexapod to have an OTT streaming flow
 * The raspberry pi 3 and the freenove hexapod could be installed on a VPN so they don't have to be on the same network nor in range of each other
 * The mobile app could have a speech recognition system so it could remote control the freenove hexapod using voice as well