var express = require('express');
var router = express.Router();
var db = require('../results');

require('string.prototype.startswith');

router.route('/get/:index')
  .get(function(req, res){
    var index = req.params.index;
    res.json(db.filter(function(rslt){ return rslt['index'] === index })[0]['results']);
  });

module.exports = router;