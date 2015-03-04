var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/search', function(req, res, next) {
  var params = req.params;
  var query = params.q;
  console.log (params)
  var requestCallback = function (error, response, body) {
    res.json(body);
  }
  var uri = 'http://api.stackexchange.com/2.2/search/advanced' +
    '?order=desc' +
    '&sort=activity' +
    '&site=stackoverflow' +
    '&q=' + query;
  request(uri, requestCallback);
});

module.exports = router;
