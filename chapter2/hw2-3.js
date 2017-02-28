use pcat;

var total = db.products.find({ "limits.voice.n": { $exists: true } }).count()

// 3
print(total);