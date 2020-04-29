import logging
import time
import os
import requests as r
from threading import Thread, Event
from respeaker import Microphone
from respeaker.bing_speech_api import BingSpeechAPI

# use madplay to play mp3 file     
#os.system('madplay')               

# get a key from https://www.microsoft.com/cognitive-services/en-us/speech-api
BING_KEY = '7ffd373b500f4ad498994103de1c865b'      

def task(quit_event):         
	import sys
	print sys.path                                  
	mic = Microphone(quit_event=quit_event)                                   
	bing = BingSpeechAPI(key=BING_KEY)    
	url_api = "http://127.0.0.1/api/"                                 

	while not quit_event.is_set():              
		data = mic.listen()
		try:                    
			text = bing.recognize(data)
			if text:           
				print('Recognized %s' % text)
			if text == 'avance':
				#Faire un appel API
				API_ENDPOINT = url_api+"movement/forward/80"
				res = r.get(API_ENDPOINT)
			if text == 'recule':
				API_ENDPOINT = url_api+"movement/back/80"
				res = r.get(API_ENDPOINT)
			#if text == 'tourne a droite':
			#if text == 'tourne a gauche':
			#if text == 'twist':
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
