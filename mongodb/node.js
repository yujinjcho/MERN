var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/bugsdb';

var insertData = function(db, callback){
  db.collection('bugs').insert([
    {priority: 'P1', status:'Open', owner:'Ravan', title:'App crashes on open'},
    {priority: 'P2', status:'New', owner:'Eddie', title:'Misaligned border on panel'}
  ]);
  console.log('inserted data');
  callback();
};

var getData = function(db, callback){
  var cursor = db.collection('bugs').find();
  cursor.each(function(err, doc){
    assert.equal(err, null);
    if (doc != null) {
      console.dir(doc);
    } else {
      callback();
    }
  });
}

var conn = MongoClient.connect(url, function(err, db){
  assert.equal(null, err);
  console.log('connected to db');
  //getData(db, function(){ db.close(); });
  
});

