from PIL import Image
import builtins
import requests
import numpy as np
from io import StringIO, BytesIO


#Appel à la fonction qui retourne le chemin de l'image sauvegardée
def storeImage(background,starsfeat,base,option,jaunebas,countours,lunebord,toursplanet,feat,effect,numberOfLayer):

    numberLayer = numberOfLayer

    directory = '/home/CryptoPlanet'
    directorysave = '/home/CryptoPlanet/Design'
    layers = '/Layer'
    directoryLayers = [directory+layers+'/Background/background',
                       directory+layers+'/StarsFeat/starsfeat',
                       directory+layers+'/Base/base',
                       directory+layers+'/Option/option',
                       directory+layers+'/Jaunebas/jaunebas',
                       directory+layers+'/Contours/contours',
                       directory+layers+'/LuneBord/lunebord',
                       directory+layers+'/ToursPlanet/toursplanet',
                       directory+layers+'/Feat/feat',
                       directory+layers+'/Effect/effect']

    LayerLoop = [background,starsfeat,base,option,jaunebas,countours,lunebord,toursplanet,feat,effect]

    #Buildup image
    planet = Image.new('RGB', (3413,1920), (250,250,250))
    for i in range(0, 10):
        url = directoryLayers[i]+str(LayerLoop[i])+'.png'
        print(url)
        imageLayer = Image.open(url)
        planet.paste(imageLayer,(0,0), mask=imageLayer)

    planet.save(directorysave +'/'+'Planet'+str(numberLayer)+'.png',quality=100,optimize=True)

    return directorysave+'/'+'Planet'+str(numberLayer)+'.png'

