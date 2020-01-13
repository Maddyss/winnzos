Projet créer il y a 3 ans sur un gitlab privée

# Winnzos Web Application #

### Pour visiter l'application rendez-vous sur https://www.winnzos.fr ###


Pour mettre en place un serveur de test de l'application 
1. l'application est testé sur un serveur Ubuntu 14.04
2. l'application tourne sur Meteor 1.4, Node 4.4.7, Mongodb 3.2

###### curl https://install.meteor.com/ | sh ######
###### git clone git@sourcedev.winnzos.fr:root/Winnzos-dev.git ######
###### meteor build . --architecture os.linux.x86_64 ######
###### meteor npm init ######
###### meteor npm install fuse.js react react-dom react-mounter trumbowyg prerender-node ######
## Archivage des logs ##
###### nohup meteor --settings settings.json > logs/app.log 2>&1& ######
## Demarrage simple ##
###### meteor --settings settings.json ######
