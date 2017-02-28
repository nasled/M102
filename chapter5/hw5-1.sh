#!/usr/bin/env bash

mkdir /data/{rs1,rs2,rs3}

echo "Start mongo intances"
mongod --replSet rs --logpath "1.log" --dbpath /data/rs1 --port 27001 --fork
mongod --replSet rs --logpath "2.log" --dbpath /data/rs2 --port 27002 --fork
mongod --replSet rs --logpath "3.log" --dbpath /data/rs3 --port 27003 --fork

echo "Create the replica set"
mongo --port 27001 << 'EOF'
config = { _id: "rs", members:[
    { _id: 0, host: "localhost:27001"},
    { _id: 1, host: "localhost:27002"},
    { _id: 2, host:  "localhost:27003", arbiterOnly: true} ]
};
rs.initiate(config);
EOF

mongo --port 27001 --eval "rs.status()"
sleep 10
echo "waiting for 10 seconds..."
mongo --port 27001 --eval "rs.status().members[2].stateStr"

# 7
mongo --port 27001 --eval "rs.status().members[2].state"

