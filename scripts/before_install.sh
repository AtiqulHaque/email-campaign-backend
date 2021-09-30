#!/bin/bash

HOME=/var/www/html
LOGFOLDER=$HOME/log
LOG=$LOGFOLDER/deploy.log
mkdir $LOGFOLDER
touch $LOG
/bin/echo "$(date '+%Y-%m-%d %X') : ** Before Install Hook Started **" >> $LOG


/bin/echo "$(date '+%Y-%m-%d %X') : ** Before Install Hook Completed **" >> $LOG
