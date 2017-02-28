#!/usr/bin/env bash

rm -rf shard*
rm -rf config*

mkdir ./{shard1,config}

mongod --fork --dbpath shard1 --logpath "shard1.log" --smallfiles --oplogSize 64 --port 20001
mongo --port 20001 < hw6-1-1.js

sleep 2
mongod --fork --dbpath shard1 --logpath "shard1.log" --smallfiles --oplogSize 64 --port 20001 --shardsvr
mongod --fork --dbpath config --logpath "config.log" --smallfiles --oplogSize 64 --port 21001 --configsvr
mongos --fork --logpath "mongos.log" -port 22001 --configdb localhost:21001

# 1000001
mongo --port 22001 < hw6-1-2.js