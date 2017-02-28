#!/usr/bin/env bash

./hw4-3.sh

# R
mongo --port 27003   << 'EOF'
use local;
print(db.oplog.rs.find( { } ).sort( { $natural : 1 } ).limit( 1 ).next( ).o.msg[0])
EOF