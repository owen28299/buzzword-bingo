var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var resetRoute = require('./routes/reset.js');
var buzzwordsRoute = require('./routes/buzzwords.js');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/reset', resetRoute);
app.use('/buzzwords', buzzwordsRoute);

var server = app.listen(8080, function(){
  var host = server.address().address;
  var port = server.address().port;

  console.log("Buzzwords server listening at http://%s:%s", host, port);
});