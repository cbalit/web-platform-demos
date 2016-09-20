'use strict';

//require('colors');

var express = require('express'),
  bodyParser = require('body-parser'),
  http = require('http'),
  path = require('path'),
  api = require('./routes/api'),
  cors = require('cors');

var app = express();

app.set('port', process.env.PORT || 9000);
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT, DELETE");
  next();
});

// JSON API
app.post('/api/login', api.login);

app.listen(app.get('port'), function () {
  console.log('✔Express server listening on http://localhost:%d/', app.get('port'));
});
