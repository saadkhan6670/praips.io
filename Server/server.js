'use strict';
var path = require('path');
// Load .env file
require('dotenv').load({
  path: path.join(__dirname, './.env'),
  silent: true
});
var mongoose = require('mongoose');

var express = require('express');
var compression = require('compression');
var bodyParser = require('body-parser');
var app = express();
const praipsModel = require('./api/model');

var cors = require('cors');
var mongoose = require('mongoose');


require('./api/model')

mongoose.connect(`mongodb://localhost/praipsDB`, { useMongoClient: true }, function (err) {
  if (err) {
    console.log(err);
  }
  else {
    console.log("MongoDB is now Connected")
  }
});

app.use(cors());
app.use(compression());

//body parser middleware
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.use(express.static('public'));

app.use('/api', require('./api'));


app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});


app.listen(process.env.PORT,function () {
  console.log('Running server on ' + process.env.PORT);
});

