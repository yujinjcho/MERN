var assert = require('assert');
var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var url = 'mongodb://localhost:27017/bugsdb';
var db;

var app = express();
app.use(express.static('static'));

app.get('/api/bugs', function(req, res) {
  
  var filter = {};

  if (req.query.priority) {
    filter.priority = req.query.priority;
  }
  if (req.query.status) {
    filter.status = req.query.status;
  }

  db.collection("bugs").find(filter).toArray(function(err, docs){
    res.json(docs);
  });
})

app.get('/api/bugs/:id', function(req, res) {
  db.collection('bugs').findOne({_id: ObjectId(req.params.id)}, function(err, bug) {
    res.json(bug);
  });
});


app.use(bodyParser.json());
app.post('/api/bugs', function(req, res) {
  var newBug = req.body;
  
  // Modify POST to insert a record
  db.collection('bugs').insertOne(newBug, function(err, doc){
    // Find the inserted record to return
    var newId = doc.insertedId;
    db.collection("bugs").find({_id: newId}).next(function(err, doc){
      res.json(doc);
    })
  });
});

app.put('/api/bugs/:id', function(req, res) {
  var bug = req.body;
  console.log("Modifying bug:", req.params.id, bug);
  var oid = ObjectId(req.params.id);
  db.collection("bugs").updateOne({_id: oid}, bug, function(err, result) {
    db.collection("bugs").find({_id: oid}).next(function(err, doc) {
      res.send(doc);
    });
  });
});

MongoClient.connect(url, function(err, dbConnection){
  db = dbConnection;
  var server = app.listen(3000, function(){
    var port = server.address().port;
    console.log('Started server at port:', port);
  })
});