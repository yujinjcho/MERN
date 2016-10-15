var assert = require('assert');
var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/bugsdb';
var db;

var app = express();
app.use(express.static('static'));
/*
var bugData = [
  {id: 1, priority:"P1", status:"Open", owner:"Ravan", title:"App crashes on open"},
  {id: 2, priority:"P2", status:"New", owner:"Eddie", title:"Misaligned border on panel"}
];
*/

app.get('/api/bugs', function(req, res) {
  db.collection("bugs").find().toArray(function(err, docs){
    res.json(docs);
  });
})

/*
app.get('/api/bugs', function(req, res) {
  res.json(bugData);
})
*/

app.use(bodyParser.json());
app.post('/api/bugs', function(req, res) {
  var newBug = req.body;
  newBug.id = bugData.length + 1;
  bugData.push(newBug);
  res.json(newBug);
});

MongoClient.connect(url, function(err, dbConnection){
  db = dbConnection;
  var server = app.listen(3000, function(){
    var port = server.address().port;
    console.log('Started server at port', port);
  })
});