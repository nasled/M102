
homework = { };
homework.check1 = function() {
    if( db.isMaster().msg != "isdbgrid" ) { 
        throw "connect to a mongos not a mongod. try again."; 
    }
    print('db.getSisterDB("config").shards.count() : ');
    var n = db.getSisterDB("config").shards.count();
    print(n);
    print("There are " + n + " shards in the cluster");
    if( n == 2 ) print("as expected");
    else print("expected 2 shards? something not as expected.");
}
homework.c = function() { 
    var x = db.getSisterDB("config").chunks.aggregate( [  { $match : { ns : "week6.trades" } } ,   { $group : { _id : "$shard" , n : { $sum : 1 } } } ] );
    return x.toArray().length
}

use week6
sh.addShard('localhost:20002')
homework.check1()

print('waiting 30 seconds...')
sleep(30000)
use config
db.chunks.find( { ns:"week6.trades" }, {min:1,max:1,shard:1,_id:0} ).sort({min:1})

use week6
print(homework.c())