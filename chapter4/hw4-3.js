
var d = db.getSisterDB("replication");

homework = { }
homework.c = function() { 
    var s = rs.status();
    if( s.members.length != 3 ) { 
	print("something is wrong i don't see 3 members");
	return;
    }
    var x = 0;
    s.members.forEach( function(m){x+=m.state} );
    if( x > 7 ) { 
	print("something isn't right yet. did you wait for the new members to finish synchronizing?");
    }
    return x;
}

print(homework.c())