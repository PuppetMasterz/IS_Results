var express = require('express');
var router = express.Router();
var db = require('../db/db.json');

require('string.prototype.startswith');

const GPV = {
  "A+" : 4,
  "A" : 4,
  "A-" : 3.75,
  "B+" : 3.25,
  "B" : 3,
  "B-" : 2.75,
  "C+": 2.25,
  "C" : 2,
  "C-" : 1.75,
  "D+" : 1.25,
  "D" : 1,
  "D-" : 0.75,
  "E" : 0
}

var getTotalCredits = function(results){

  var gpaResults = results.filter(function(res){
    return res.grade !== undefined && !res.code.startsWith("EN");
  });

  return gpaResults.reduce(function(a, b){
    return a + parseInt(b.credits);
  }, 0);
};

var calculateGPA = function(results, totalCredits){

  var gpaResults = results.filter(function(res){
    return res.grade !== undefined && !res.code.startsWith("EN");
  });

  var totalGpv = gpaResults.reduce(function(a, b){
    return a + (parseInt(b.credits) * GPV[b.grade]);
  }, 0);

  return totalGpv / totalCredits;
};

var calculateCGPA = function(gpa, credits) {
  var totalGpv = gpa.reduce(function(r,a,i){
    return r + a * credits[i]
  }, 0)

  var sumCredits = credits.reduce(function(a, b) { return a + b; }, 0);

  return totalGpv/sumCredits;
};


router.route('/get/:index')
  .get(function(req, res){
    var index = req.params.index;
    var final = {};
    var gpas = [];
    var credits = [];

    for (year in db) {
      final[year] = {};
      for (semester in db[year]) {
        final[year][semester] = {};
        var results = db[year][semester].results.map(function(subject){
          return {
            title: subject.Title,
            code: subject.Subject_Code,
            credits: subject.Credits,
            semester: subject.Semester,
            grade: subject.Marks[index]
          }
        });
        var totalCredits = getTotalCredits(results);
        var gpa = calculateGPA(results, totalCredits);
        gpas.push(gpa);
        credits.push(totalCredits);
        final[year][semester]['gpa'] = gpa
        final[year][semester]['result'] = results;
      }


    };

    finalGpa = calculateCGPA(gpas, credits);
    final['gpa'] = finalGpa;
    res.json(final);
  });

module.exports = router;