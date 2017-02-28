
var d = db.getSisterDB("replication");

homework = { }
homework.init = function() {
    var rsConf; try { rsConf = rs.conf(); } catch (e) { rsConf = null; }
    if( rs.Conf != null ) {
	print("at this stage of the homework the mongod should NOT be using --replSet");
	return;
    }
    if( d.foo.count() != 0 ) {
	print("expected replication.foo collection to be empty to init. can't init. :-(");
	return;
    }
    for( var i = 0; i < 5000; i++ ) d.foo.insert({x:i,y:Math.random()});
    var result = db.getLastError();
    if( result ) print("Something is wrong? : " + result);
    else print("ok");
}
homework.b = function() {
    if( !db.isMaster().ismaster ) {
	print("something is wrong. try again. initiate?");
	return;
    }
    if( rs.status().members.length != 1 ) { 
	print("only supposed to be one member of the set at this point. try again?");
	return;
    }
    return rs.status().members.length + d.foo.count() + 1;
}

rs.initiate()
print('waiting for replica init...');
sleep(5000)
homework.init();

use replication;
db.foo.find();
print(homework.b());
