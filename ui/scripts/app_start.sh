#!/bin/bash
cd /home/ec2-user/uiServer
npm start
pm2 serve build/ --name "absenceManager-ui"
pm2 startup
pm2 save
pm2 restart all
