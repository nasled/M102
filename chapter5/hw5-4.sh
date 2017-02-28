#!/usr/bin/env bash

rm -rf rs*
mkdir {rs1,rs2}

echo "Start mongo intances"
mongod --replSet rs --logpath "rs1.log" --dbpath ./rs1 --port 27001 --fork
mongod --replSet rs --logpath "rs2.log" --dbpath ./rs2 --port 27002 --fork

echo "Create the replica set"
mongo --port 27001 --eval "rs.initiate({_id: 'rs', members: [{_id:0, host:'localhost:27001'}, {_id:1, host:'localhost:27002'}]});"

echo "Waiting for replica init ..."
sleep 10
mongo --port 27001 --eval "rs.status()"

echo "Shutdown first, reconfigure without force param..."
mongo --port 27001 << 'EOF'
use admin;
db.shutdownServer();
EOF
#{
#        "ok" : 0,
#        "errmsg" : "replSetReconfig should only be run on PRIMARY, but my state is SECONDARY; use the \"force\" argument to override",
#        "code" : 10107,
#        "codeName" : "NotMaster"
#}
mongo --port 27002 --eval "rs.reconfig({_id: 'rs', members: [{_id:1, host:'localhost:27002'}]});"

echo "Reconfigure with force param..."
sleep 2
# { "ok" : 1 }
mongo --port 27002 --eval "rs.reconfig({_id: 'rs', members: [{_id:1, host:'localhost:27002'}]}, {force: true});"

# {force: true}