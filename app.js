var express = require('express');
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var mongo = require('mongodb');
var assert = require('assert'); 
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

fs.readdirSync(__dirname + '/models').forEach(function(filename) {
    if (~filename.indexOf('.js')) {
        require(__dirname + '/models/' + filename)
    }
});

var uri = 'mongodb://USERNAME:PASSWORD@countries-shard-00-00-uphap.mongodb.net:27017,countries-shard-00-01-uphap.mongodb.net:27017,countries-shard-00-02-uphap.mongodb.net:27017/data?ssl=true&replicaSet=countries-shard-0&authSource=admin';

/*var uri = 'mongodb://localhost/info';*/

mongoose.connect(uri);
var db = mongoose.connection;

app.use(require('./routes/index'));
app.use(require('./routes/country'));
app.use(require('./routes/data'));


/*MongoClient.connect(uri, function(err, db) {
    assert.equal(null, err);
    console.log('Connected successfully to server');
});*/

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connection established");
});

app.listen(port, function() {
        console.log('Listening on port ' + port);
        });

