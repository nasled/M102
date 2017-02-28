use pcat;
db.products.createIndex({'for': 1}, {name: 'for_1'});

res = db.products.find({'for': 'ac3'}).explain('executionStats');
isIndexUsed = (res['queryPlanner']['winningPlan']['inputStage']['indexName']) ? 'yes' : 'no';

//Q1 :  4
//Q2 :  4
//Q3 :  yes

print('Q1 : ', res['executionStats']['nReturned']);
print('Q2 : ', res['executionStats']['totalDocsExamined']);
print('Q3 : ', isIndexUsed);