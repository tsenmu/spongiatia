var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/search/', function(req, res, next) {
  var query = req.query;
  var q = query.q;
  var requestCallback = function (error, response, body) {
    res.json(body);
  }
  var uri = 'http://api.stackexchange.com/2.2/search/advanced' +
    '?order=desc' +
    '&sort=activity' +
    '&site=stackoverflow' +
    '&q=' + q;
  request(uri, requestCallback);
});

module.exports = router;
