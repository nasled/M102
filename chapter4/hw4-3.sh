#!/usr/bin/env bash

rm -rf /data/db/replica
mkdir /data/db/replica
mkdir /data/db/replica/{1,2,3,logs}

# init replica
mongod --dbpath /data/db/replica/1 --port 27001 --smallfiles --oplogSize 50 --logpath /data/db/replica/logs/1.txt --logappend --fork --replSet rs1
mongo --port 27001 << 'EOF'
config = {_id: "rs1", members:[{ _id : 0, host : "localhost:27001" }]};
rs.initiate(config)
EOF
echo 'waiting 5 sec ...'
sleep 5
mongo --port 27001 --eval "rs.status()"

# add new slaves
mongod --dbpath /data/db/replica/2 --port 27002 --smallfiles --oplogSize 50 --logpath /data/db/replica/logs/2.txt --logappend --fork --replSet rs1
mongod --dbpath /data/db/replica/3 --port 27003 --smallfiles --oplogSize 50 --logpath /data/db/replica/logs/3.txt --logappend --fork --replSet rs1
#{ "ok" : 1 }
#{ "ok" : 1 }
mongo --port 27001 << 'EOF'
rs.add("localhost:27002")
rs.add("localhost:27003")
EOF

# allow read from secondary
mongo --port 27002 --eval "rs.slaveOk()"

echo 'waiting 10 sec ...'
sleep 10
# 5
mongo --port 27001 < hw4-3.js