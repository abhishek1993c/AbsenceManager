#!/bin/bash
rm -rf /var/app/myapp/
cd /home/ec2-user/uiServer
curl -sL https://rpm.nodesource.com/setup_14.x | sudo -E bash -
yum -y install nodejs npm serve
