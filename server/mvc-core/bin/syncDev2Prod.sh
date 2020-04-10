#!/bin/sh

user='jmbruneau'
#remote='linserv-info-03.iutnice.unice.fr'
#remote_dir='m314/mvc-core'

remote='10.0.2.110'
remote_dir='www/iotia/mvc-core'

# Repository rsync
rsync $1 -auvz ./ $user@$remote:$remote_dir/
# Change config link from Dev -> Prod
ssh $user@$remote "cd $remote_dir/etc/; ln -s -f Config.prod.php Config.php"

