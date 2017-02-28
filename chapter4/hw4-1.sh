#!/usr/bin/env bash

rm -rf /data/db/replica
mkdir /data/db/replica
mkdir /data/db/replica/{1,2,3,logs}

mongod --dbpath /data/db/replica/1 --port 27001 --smallfiles --oplogSize 50 --logpath /data/db/replica/logs/1.txt --logappend --fork

# 5001
mongo --port 27001 < hw4-1.js