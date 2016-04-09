var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

var JSONFile = {
  "buzzwords" : []
};

var score = 0;

app.use(express.static('public'));

app.get("/buzzwords", function(req,res){
  res.json(JSONFile);
});

app.post("/buzzwords", function(req,res){

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

});

app.put("/buzzwords", function(req,res){
  var buzzWord = req.body.buzzWord;
  var bingo = false;

  (JSONFile.buzzwords).forEach(function(element, index){
    if(element.buzzWord === buzzWord){
      if (JSONFile.buzzwords[index].heard === false){
        score += Number(element.points);
        bingo = true;
        JSONFile.buzzwords[index].heard = true;
      }
    }
  });

  res.json({
    "success" : bingo,
    "newScore" : score
  });

});

app.delete("/buzzwords", function(req,res){
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

app.post("/reset", function(req,res){
  JSONFile.buzzwords = [];
  score = 0;
  res.json({
    "success" : true
  });
});

var server = app.listen(8080, function(){
  var host = server.address().address;
  var port = server.address().port;

  console.log("Buzzwords server listening at http://%s:%s", host, port);
});