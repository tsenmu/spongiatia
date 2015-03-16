var _ = require('lodash');
var Q = require('q');
var request = require('request');

var API_PREFIX = 'http://api.stackexchange.com/2.2';

var search = function(query) {
  var deferred = Q.defer();
  /*
    http://api.stackexchange.com/docs/advanced-search
    Filter: !--KJA8bUDfsI for retrieving only question IDs.
  */
  var searchUri = API_PREFIX + '/search/advanced?' + 
  '&site=stackoverflow' + 
  '&order=desc' +
  '&sort=relevance' +
  '&accepted=True' +
  '&pagesize=10' +
  '&filter=!--KJA8bUDfsI' + 
  '&q=' + query;
  request({
    uri: searchUri,
    gzip: true,
    json: true
  }, function(error, response, body) {
    if (error) {
      deferred.reject(error);
    }
    var items = body.items;
    var questionIds = [];
    _.forEach(items, function(item) {
      questionIds.push(item.question_id);
    });
    deferred.resolve(questionIds);
  });
  return deferred.promise;
}

var retrieveQuestion = function(questionId) {
  var deferred = Q.defer();
  var questionUri = API_PREFIX + '/questions/' + questionId + '?' +
  '&site=stackoverflow' + 
  '&sort=votes' +
  '&filter=!4(Yr(zu(6cPEMGE59'; 
  request({
    uri: questionUri,
    gzip: true,
    json: true
  }, function(error, response, body) {
    if (error) {
      deferred.reject(error);
    } else {
      var items = body.items;
      deferred.resolve(items);
    }
  });
  return deferred.promise;      
}

var retrieveAnswer = function(answerId) {
  var deferred = Q.defer();
  /*
    http://api.stackexchange.com/docs/answers-by-ids
    Filter: !--pn9shfL_dA for retrieving only answer body in markdown.
  */
  var answerUri = API_PREFIX + '/answers/' + answerId + '?' +
  '&site=stackoverflow' +
  '&filter=!--pn9shfL_dA';
  request({
    uri: answerUri,
    gzip: true,
    json: true
  }, function(error, response, body) {
    if (error) {
      deferred.reject(error);
    } else {
      var items = body.items;
      deferred.resolve(items);
    }
  });
}


var retrieveQuestions = function(questionIds) {
  var deferred = Q.defer();
  Q.all(_.map(questionIds, retrieveQuestion))
  .then(function(questions) {
    var acceptedAnswerIds = _.map(questions, function(question) {
      console.log(question);
      console.log(question.accepted_answer_id);
      return question.accepted_answer_id;
    });
    Q.all(_.map(acceptedAnswerIds, retrieveAnswer))
    .then(function(answers) {
      answers = _.map(answers, function(answer) {
        var obj = {};
        obj.accepted_answer = answer;
        return answer;
      });
      questions = _.forEach(questions, function(question, index) {
        _.assign(question, answers[index]);
      });
      deferred.resolve(questions);
    }, deferred.reject);
  })
  .done();
  return deferred.promise;
}



exports.search = function(query) {
  var deferred = Q.defer();
  search(query)
  .then(retrieveQuestions)
  .then(deferred.resolve, deferred.reject)
  .done();
  return deferred.promise;
}






