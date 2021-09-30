#!/bin/bash

HOME=/var/www/html
LOGFOLDER=$HOME/log
LOG=$LOGFOLDER/deploy.log
mkdir $LOGFOLDER
touch $LOG
/bin/echo "$(date '+%Y-%m-%d %X') : ** Before Install Hook Started **" >> $LOG

# Install node.js
sudo yum install python-software-properties -y
sudo apt-add-repository ppa:chris-lea/node.js -y
sudo apt-get update
sudo apt-get install nodejs -y

# Install nodemon
# sudo npm install nodemon -g

# Install forever module
# https://www.npmjs.com/package/forever
sudo npm install forever -g

# Clean working folder
# sudo find /home/ubuntu/test -type f -delete


/bin/echo "$(date '+%Y-%m-%d %X') : ** Before Install Hook Completed **" >> $LOG
