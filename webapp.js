var assert = require('assert');
var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/bugsdb';
var db;

var app = express();
app.use(express.static('static'));

app.get('/api/bugs', function(req, res) {
  
  var filter = {};

  console.log(req.query);
  console.log(req.query);

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

MongoClient.connect(url, function(err, dbConnection){
  db = dbConnection;
  var server = app.listen(3000, function(){
    var port = server.address().port;
    console.log('Started server at port:', port);
  })
});