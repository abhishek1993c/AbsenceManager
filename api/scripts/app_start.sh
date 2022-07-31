#!/bin/bash
cd /home/ec2-user/apiserver/src
npm start
pm2 serve --name "absenceManager" -s build
pm2 startup
pm2 save
pm2 restart all