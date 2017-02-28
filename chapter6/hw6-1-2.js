
homework = { };
homework.a = function() {
    assert( db == "week6" ); if( db.isMaster().msg != "isdbgrid" ) { throw "connect to a mongos not a mongod. try again."; } return db.trades.count();
}

use week6
sh.addShard('localhost:20001')
print('waiting...')
sleep(5000)
db.trades.find().pretty()
db.trades.count()
db.trades.stats()
print(homework.a())