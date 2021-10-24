#!/bin/bash

HOME=/var/www/html
LOGFOLDER=$HOME/log
LOG=$LOGFOLDER/deploy.log
mkdir $LOGFOLDER
touch $LOG
/bin/echo "$(date '+%Y-%m-%d %X') : ** Before Install Hook Started **" >> $LOG

sudo yum install -y gcc-c++ make

curl -sL https://rpm.nodesource.com/setup_14.x | sudo -E bash -

sudo yum install -y nodejs

sudo npm install pm2@latest -g


/bin/echo "$(date '+%Y-%m-%d %X') : ** Before Install Hook Completed **" >> $LOG
