
homework = { };
homework.init = function() { 
    var t = db.trades;
    if( t.count() ) { 
        throw "week6.trades not empty, so won't init(). If you want to reinit, drop the collection first.";
    }
    o = { 
        ticker : 'abcd',
        time   : new Date(2012,2,3),
        price  : 110,
        shares : 200, 
        details : {
            asks : [ 110.07, 110.12, 110.30 ],
            bids : [ 109.90, 109.88, 109.70, 109.5 ], 
            system : 'abc',
            lag : 0
        }
    };
    t.insert(o);

    var j = 100;
    for( var i = 0; i < 1000000; i++ ) {
        if( i % 10000 == 0 ) { 
            print(db.getLastError() + ' ' + i);
        }
        if( ++j >= 500 ) j = 100;
        o.ticket = 'z' + j;
        o.time = new Date(2012, 2, 3, 9, i%60, (i/60)%60, (i/3600)%1000);
        t.insert(o);
    }
    printjson( db.getLastErrorObj() );
    print("count: " + t.count());
}

use week6
homework.init()

db.trades.stats()

use admin
db.shutdownServer()