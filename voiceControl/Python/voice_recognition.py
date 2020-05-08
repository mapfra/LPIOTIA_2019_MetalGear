# coding: utf-8
 
import logging
import time
import requests as r
from threading import Thread, Event
from respeaker import Microphone
from lib.bing_speech_api import BingSpeechAPI
 
BING_KEY = '7ffd373b500f4ad498994103de1c865b'
HOST = 'http://127.0.0.1:3000'
 
def getQuantityFromString(text):
    depCentimetre = dict()
    #Pour les centimetres
    depCentimetre['dix'] = 10
    depCentimetre['vingt'] = 20
    depCentimetre['trente'] = 30
    depCentimetre['quarante'] = 40
    depCentimetre['cinquante'] = 50
    depCentimetre['soixante'] = 60
    depCentimetre['soixante-dix'] = 70
    depCentimetre['quatre-vingt'] = 80
    depCentimetre['quatre-vingt-dix'] = 90
 
    depMetre = dict()
    #Pour les metres
    depMetre['un'] = 100
    depMetre['deux'] = 200
    depMetre['trois'] = 300
    depMetre['quatre'] = 400
    depMetre['cinq'] = 500
    depMetre['six'] = 600
    depMetre['sept'] = 700
    depMetre['huit'] = 800
    depMetre['neuf'] = 900
 
    if 'centimètres' or 'centimètre' in text:
        for cle in depCentimetre.keys():
            if cle in text:
                return str(depCentimetre[cle])
    if 'mètres' or 'mètre' in text:
        for cle in depMetre.keys():
            if cle in text:
                return str(depMetre[cle])
    return '10'
 
def task(quit_event):
    mic = Microphone(quit_event=quit_event)
    bing = BingSpeechAPI(key=BING_KEY)
 
    while not quit_event.is_set():
            data = mic.listen()
            try:
                text = bing.recognize(data)
                if text:
                    print('\n\nRecognized %s\n' % text)
                    qty = getQuantityFromString(text)
		    print(qty)
                if 'avance' in text:
                    API_ENDPOINT = HOST+"/movement/forward/" + qty
                    res = r.get(API_ENDPOINT)
                    print(res)
                elif 'recule' in text:
                    API_ENDPOINT = HOST+"/movement/backward/" + qty
                    res = r.get(API_ENDPOINT)
                    print(res)
                elif 'rampe à gauche'.decode('utf-8') in text:
                    API_ENDPOINT = HOST+"/movement/left/" + qty
                    res = r.get(API_ENDPOINT)
                    print(res)
                elif 'rampe à droite'.decode('utf-8') in text:
                    API_ENDPOINT = HOST+"/movement/right/" + qty
                    res = r.get(API_ENDPOINT)
                    print(res)
                elif 'tourne à droite'.decode('utf-8') in text:
                    API_ENDPOINT = HOST+"/movement/turn/right/" + qty
                    res = r.get(API_ENDPOINT)
                    print(res)
                elif 'tourne à gauche'.decode('utf-8') in text:
                    API_ENDPOINT = HOST+"/movement/turn/left/" + qty
                    res = r.get(API_ENDPOINT)
                    print(res)
                elif 'éteins-toi'.decode('utf-8') in text:
                    API_ENDPOINT = HOST+"/action/standby"
                    res = r.get(API_ENDPOINT)
                    print(res)
                elif 'twist' in text:
                    API_ENDPOINT = HOST+"/movement/twist/" + qty
                    res = r.get(API_ENDPOINT)
                    print(res)
                elif 'allume toi' in text:
                    API_ENDPOINT = HOST+"/action/wakeup"
                    res = r.get(API_ENDPOINT)
                    print(res)
                elif 'calibre toi' in text:
                    API_ENDPOINT = HOST+"/action/calibrate"
                    res = r.get(API_ENDPOINT)
                    print(res)
                elif 'rampe' in text:
                    API_ENDPOINT = HOST+"/movement/" + qty
                    res = r.get(API_ENDPOINT)
                    print(res)
                elif 'changes ta hauteur' in text:
                    API_ENDPOINT = HOST+"/height/" + qty
                    res = r.get(API_ENDPOINT)
                    print(res)
                elif 'bouge ton corps' in text:
                    API_ENDPOINT = HOST+"/move/" + qty
                    res = r.get(API_ENDPOINT)
                    print(res)
                elif 'tourne toi' in text:
                    API_ENDPOINT = HOST+"/rotate/" + qty
                    res = r.get(API_ENDPOINT)
                    print(res)
                elif 'dance' in text:
                    API_ENDPOINT = HOST+"/dance/" + qty
                    res = r.get(API_ENDPOINT)
                    print(res)
            except Exception as e:
                print(e.message)
 
def main():
    logging.basicConfig(level=logging.DEBUG)
    quit_event = Event()
    thread = Thread(target=task, args=(quit_event,))
    thread.start()
    while True:
        try:
            time.sleep(1)
        except KeyboardInterrupt:
            print('Quit')
            quit_event.set()
            break
    thread.join()
 
if __name__ == '__main__':
    main()
