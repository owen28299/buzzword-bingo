var express = require('express');
var router = express.Router();
var JSONFile = require('./score.js');
var validation = require('./validation.js');

router.use(validation)
  .route("/")
  .get(function(req,res){
    res.json(JSONFile);
  })
  .post(function(req,res){
    var nonExistent = (JSONFile.buzzwords).every(function(element, index){
      if(element.buzzWord !== req.body.buzzWord){
        return true;
      }
      else {
        return false;
      }
    });

    if (nonExistent){
      req.body.heard = false;
      JSONFile.buzzwords.push(req.body);
      res.json({
        "success" : true
      });
    }

    else {
      res.json({
        "success" : false
      });
    }
  })
  .put(function(req,res){
    var buzzWord = req.body.buzzWord;
    var bingo = false;

    (JSONFile.buzzwords).forEach(function(element, index){
      if(element.buzzWord === buzzWord){
        if (JSONFile.buzzwords[index].heard === false){
          JSONFile.score += Number(element.points);
          bingo = true;
          JSONFile.buzzwords[index].heard = true;
        }
      }
    });

    res.json({
      "success" : bingo,
      "newScore" : JSONFile.score
    });

  })
  .delete(function(req,res){
    var buzzWord = (req.body.buzzWord);

    var deleted = false;

    (JSONFile.buzzwords).forEach(function(element, index){
      if(element.buzzWord === buzzWord){
        JSONFile.buzzwords.splice(index,1);
        deleted = true;
      }
    });

    res.json({
      "success" : deleted
    });
  });



module.exports = router;