db=db.getSiblingDB('test');
db.postings.drop(   );

for (i = 0; i < 2; i++) {
    record = {
        "id": i,
        "author" : "joe",
        "title" : "Too big to fail",
        "text" : "...",
        "tags" : [
                "business",
                "finance"
        ],
        "when" : ISODate("2008-11-03T00:00:00Z"),
        "views" : 23002,
        "votes" : 1,
        "voters" : [
                "jane",
                "bob",
                "somesh"
        ],
        "comments" : [
                {
                        "commenter" : "allan",
                        "comment" : "Well, i don't think soâ€¦",
                        "flagged" : (i % 2 == 0),
                        "plus" : 2
                }
        ]
    };
    db.postings.insert(record);
}

