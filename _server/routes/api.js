'use strict';

var _ = require('underscore');

var user={
  "firstname": "CYRIL",
  "lastname": "BALIT",
  "username": "cbalit",
  "id":"123456"
};


exports.login = function(req, res){
  res.status(200).json(user);
};



exports.logout = function(req, res){
  res.status(200).json({response:'OK'});
};

