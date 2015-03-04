var express = require('express');
var router = express.Router();

router.get('/search', function(req, res, next) {
  var params = req.params;
  res.json(params)
});

module.exports = router;
