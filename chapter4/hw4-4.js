var d = db.getSisterDB("replication");

homework = { }
homework.d = function() {
    var s = rs.status();
    if( s.members.length != 2 ) {
	print("something is wrong i don't see 2 members");
	return;
    }
    var x = 0;
    s.members.forEach( function(m){x+=m._id+m.state} );
    if( x > 9 ) {
	print("something isn't right yet. did you wait for a new election to finish? want to see a primary and a secondary");
    }
    return x;
}

print(homework.d())