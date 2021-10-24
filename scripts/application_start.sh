#!/bin/bash

pm2 kill

pm2 start  /var/www/html/app.js -f
