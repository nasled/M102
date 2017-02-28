#!/usr/bin/env bash

rm -rf /data/db/replica
mkdir /data/db/replica
mkdir /data/db/replica/{1,2,3,logs}

# init replica
mongod --dbpath /data/db/replica/1 --port 27001 --smallfiles --oplogSize 50 --logpath /data/db/replica/logs/1.txt --logappend --fork --replSet rs1
mongod --dbpath /data/db/replica/2 --port 27002 --smallfiles --oplogSize 50 --logpath /data/db/replica/logs/2.txt --logappend --fork --replSet rs1
mongod --dbpath /data/db/replica/3 --port 27003 --smallfiles --oplogSize 50 --logpath /data/db/replica/logs/3.txt --logappend --fork --replSet rs1
mongo --port 27001 << 'EOF'
config = {_id: "rs1", members:[
    { _id : 0, host : "localhost:27001" },
    { _id : 1, host : "localhost:27002" },
    { _id : 2, host : "localhost:27003" },
]};
rs.initiate(config)
EOF
echo 'waiting 20 sec to init replica...'
sleep 20
mongo --port 27001 --eval "rs.status()"

mongo --port 27001 --eval "rs.stepDown()"
echo 'waiting 20 sec to shut down master and select new one...'
sleep 20
mongo --port 27002 --eval "rs.status()"

mongo "mongodb://localhost:27002/?replicaSet=rs1" --eval "rs.remove('localhost:27001')"
echo 'waiting 20 sec to remove first slave from replica...'
sleep 20
mongo --port 27002 --eval "rs.status()"

# 6
mongo --port 27002 < hw4-4.js