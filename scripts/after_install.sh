#!/bin/bash

HOME=/var/www/html
LOGFOLDER=$HOME/log
LOG=$LOGFOLDER/deploy.+
mkdir $LOGFOLDER
touch $LOG
/bin/echo "$(date '+%Y-%m-%d %X') : ** After Install Hook Started **" >> $LOG
/bin/echo "$(date '+%Y-%m-%d %X') : ** Changing owner and group of application... **" >> $LOG

/user/bin/sudo /bin/chown -R ec2-user:ec2-user $HOME
echo -e "Done" >> $LOG


/bin/echo "$(date '+%Y-%m-%d %X') : ** After Install Hook Completed **" >> $LOG
