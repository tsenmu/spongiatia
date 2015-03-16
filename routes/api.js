'use strict';

var express = require('express');
var router = express.Router();
var Q = require('q');
var search = require('../libs/search');


router.get('/search/', function(req, res, next) {
  var query = req.query;
  var q = query.q;
  search.search(q)
  .then(function(questions) {
    // var deferred = Q.defer();
    res.json(questions);
    // res.render('result', questions, function(error) {
    //   if (error) {
    //     deferred.reject(error);
    //   } else {
    //     deferred.resolve();
    //   }
    // });
    // return deferred.promise;
  })
  .then(undefined, function(error) {
    console.log(error);
    res.sendStatus(500);
  });
});

module.exports = router;
