var express = require('express');
var router = express.Router();
var JSONFile = require('./score.js');

router.route("/")
  .post(function(req,res){
    JSONFile.buzzwords = [];
    JSONFile.score = 0;
    res.json({
      "success" : true
    });
  });


module.exports = router;