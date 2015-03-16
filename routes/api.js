'use strict';

var express = require('express');
var router = express.Router();
var Q = require('q');
var search = require('../libs/search');


router.post('/search/', function(req, res, next) {
  var body = req.body;
  var q = body.error_message;
  var context = body.context;
  search.search(q)
  .then(function(questions) {
    res.json(questions);
  })
  .then(undefined, function(error) {
    res.render('error', error);
  });
});

router.get('/search/', function(req, res, next) {
  var query = req.query;
  var q = query.error_message;
  var context = query.context;
  search.search(q)
  .then(function(questions) {
    res.json(questions);
  })
  .then(undefined, function(error) {
    res.render('error', error);
  });
});

module.exports = router;
