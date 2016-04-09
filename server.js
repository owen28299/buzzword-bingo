var express = require('express');
var app = express();
var router = express.Router();

var JSONFile = {
  "buzzwords" : []
};

app.use(express.static('public'));

var server = app.listen(8080, function(){
  var host = server.address().address;
  var port = server.address().port;

  console.log("Buzzwords server listening at http://%s:%s", host, port);
});