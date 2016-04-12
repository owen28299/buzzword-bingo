var express = require('express');
var router = express.Router();
var JSONFile = require('./score.js');
var validation = require('./validation.js');

router.use(validation)
  .route("/")
  .post(function(req,res){

    JSONFile.buzzwords = [];
    JSONFile.score = 0;
    res.json({
      "success" : true
    });
  });


module.exports = router;