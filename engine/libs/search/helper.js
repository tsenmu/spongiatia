var _ = require('lodash');

exports.stringifyArray = function(arr) {
  var result = '';
  _.forEach(arr, function(el) {
    result += el + ';'
  });
  result = _.trimRight(result, ';');
  return result;
}