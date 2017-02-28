homework = { }

var d = db.getSisterDB("replication");

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

homework.a = function() { 
    return d.foo.stats().count + d.foo.stats().nindexes;
}

homework.init();
print(homework.a());