'use strict';

var _ = require('lodash');

exports.stringifyArray = function(arr) {
  var result = '';
  _.forEach(arr, function(el) {
    result += el + ';'
  });
  result = _.trimRight(result, ';');
  return result;
}

exports.assembleObject = function(input) {
  var output = {};
  output.suggestions = [];
  console.log(input);
  _.forEach(input, function(item, index) {
    var suggestion = {};
    suggestion.question = {
      title: item.title,
      body_markdown: item.body_markdown,
      url: item.link
    };
    suggestion.accepted_answer = {
      body_markdown: item.accepted_answer.body_markdown
    }
    suggestion.answers = [];
    output.suggestions.push(suggestion);
  });
  return output;
}