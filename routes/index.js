var express = require('express');
var router = express.Router();
var db = require('../db/db.json');

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

var calculateGPA = function(results){

  var gpaResults = results.filter(function(res){
    return res.grade !== undefined && res.code.slice(0,2) !== "EN";
  });

  var totalCredits = gpaResults.reduce(function(a, b){
    return a + parseInt(b.credits);
  }, 0);

  var totalGpv = gpaResults.reduce(function(a, b){
    return a + (parseInt(b.credits) * GPV[b.grade]);
  }, 0);

  return totalGpv / totalCredits;
}

router.route('/get/:index')
      .get(function(req, res){
          var index = req.params.index;

          var results = db.data.map(function(subject){
              return {
                title: subject.Title,
                code: subject.Subject_Code,
                credits: subject.Credits,
                semester: subject.Semester,
                grade: subject.Marks[index]
              }
          });

          var gpa = calculateGPA(results);
          console.log(gpa);

          results.push({ gpa: gpa });
          res.json(results);
      });

module.exports = router;