#!/bin/bash
cd /home/ec2-user/apiserver
npm start
pm2 start dist/index.js --name "absenceManager-api" --watch -i max
pm2 startup
pm2 save
pm2 restart all