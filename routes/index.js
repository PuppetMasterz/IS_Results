var express = require('express');
var router = express.Router();
var db = require('../db/db.json');

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

          res.json(results);
      });

module.exports = router;