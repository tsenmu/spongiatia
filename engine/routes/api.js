'use strict';

var express = require('express');
var request = require('request');
var _ = require('lodash');
var router = express.Router();

var stackOverflowUrl = 'http://api.stackexchange.com/2.2';

router.get('/search/', function(req, res, next) {
  var query = req.query;
  var q = query.q;
  var questionIds = [];
  var questionRequestCallback = function (error, response, body) {
    var items = body.items;
  }

  var searchRequestCallback = function (error, response, body) {
    var items = body.items;
    _.forEach(items, function(item) {
      questionIds.push(item.question_id);
    });

    _.forEach(questionIds, function(questionId) {
      var questionUri = stackOverflowUrl + '/questions/' + questionId + '?' +
      '&site=stackoverflow' + 
      '&sort=votes';
      request({
        uri: questionUri,
        gzip: true,
        json: true
      }, questionRequestCallback);
    });
    res.json(items);
  }
  var searchUri = stackOverflowUrl + '/search/advanced?' + 
    '&site=stackoverflow' + 
    '&order=desc' +
    '&sort=relevance' +
    '&accepted=True' +
    '&pagesize=10' +
    '&q=' + q;
  request({
    uri: searchUri,
    gzip: true,
    json: true
  }, searchRequestCallback);
});

module.exports = router;
