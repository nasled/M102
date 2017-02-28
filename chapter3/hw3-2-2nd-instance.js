use performance;

var homework = { };
if( "performance" != db ) {
    print("performance.js: want db to be 'performance' when the shell starts. terminating.");
    throw "use performance db before running script";
}
homework.c = function() {
    var long = false;
    var y = 0;
    var ip;
    var i = 0;
    var k = false;
    for( ; i < 100; i++ ) {
        ip=db.currentOp().inprog;
        ip.forEach(function (x){if(x.op=='update')k++;});
        if( k ) break;
        sleep(1);
    }
    if(!k){print("not seeing the expected activity, is homework.b() really running in a separate shell? try again.");return;}
    ip.forEach(function (x){if(x.op=='update'&&x.secs_running>3)y+=x.secs_running;});
    return  y^0xc;
}
homework.getSlowestId = function() {
    var list = db.currentOp();
    var slowId = 0;
    var slowSecs = 0;

    for (var j = 0; j < list.inprog.length; j++) {
        if (list.inprog[j].secs_running > slowSecs) {
            slowId = list.inprog[j].opid;
            slowSecs = list.inprog[j].secs_running;
        }
    }

    return slowId;
};

//sleep 5 seconds...
//1986281
//{ "info" : "attempting to kill op", "ok" : 1 }
//12

print('sleep 5 seconds...');
sleep(5000);
id = homework.getSlowestId();
db.killOp(id);
sleep(1000);
homework.c();