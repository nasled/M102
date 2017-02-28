#!/usr/bin/env bash

./hw6-2.sh

mkdir shard2
mongod --fork --dbpath shard2 --logpath "shard2.log" --smallfiles --oplogSize 64 --port 20002

# 2
mongo --port 22001 < hw6-3.js