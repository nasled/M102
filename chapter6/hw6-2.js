
homework = { };
homework.b = function() { 
    if( db.isMaster().msg != "isdbgrid" ) { throw "connect to a mongos not a mongod. try again."; }
    var x = db.getSisterDB("config").chunks.find({ns:"week6.trades"}).count();
    return x <= 2 ? x : 3;
}

use week6
db.trades.createIndex({ticker: 1, time: 1})

sh.enableSharding("week6");
sh.shardCollection("week6.trades", {ticker: 1, time: 1})

use config
db.chunks.find({}, {min:1,max:1,shard:1,_id:0,ns:1})

print(homework.b())