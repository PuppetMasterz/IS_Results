var express = require('express');
var router = express.Router();
var db = require('../results');

require('string.prototype.startswith');

router.route('/get/:index')
  .get(function(req, res){
    var index = req.params.index;
    var result = db.filter(function(rslt){ return rslt['index'] === index });

    if(result.length == 0){
    	res.json({ error: 'No results found for the index number' });
    	return;
    }

    res.json(result[0]['results']);
  });

module.exports = router;