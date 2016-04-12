var submit = document.getElementById("add_buzzword");
var getBuzzwords = document.getElementById("get_buzzwords");
var buzzWordList = document.getElementById("buzzwords");
var reset = document.getElementById("reset");


submit.addEventListener("click", function(){
  var buzzWord = document.getElementById("buzzWord");
  var points = document.getElementById("points");

  var pbReq = new XMLHttpRequest();
  pbReq.addEventListener('load', function(){
    buzzWord.value = "";
    points.value = "";
  });
  pbReq.open("POST", "http://localhost:3001/buzzword");
  pbReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  pbReq.send("buzzWord=" + buzzWord.value + "&points=" + points.value);

});

getBuzzwords.addEventListener("click", function(event){
  event.preventDefault();

  buzzWordList.innerHTML = "";

  var gbReq = new XMLHttpRequest();
  gbReq.addEventListener('load', function(){
    var buzzWords = JSON.parse(this.responseText).buzzwords;
    var score = JSON.parse(this.responseText).score;

    if(buzzWords.length !== 0){
      var h1 = document.createElement('h1');
      h1.innerHTML = score;
      h1.id = "score";
      buzzWordList.appendChild(h1);
    }

    buzzWords.forEach(function(element){
      var docfrag = document.createDocumentFragment();
      var h2 = document.createElement('h2');
      h2.innerHTML = element.buzzWord;
      var h3 = document.createElement('h3');
      h3.innerHTML = "points: " + element.points;
      var button = document.createElement('button');

      if(element.heard === true){
        button.innerHTML = "Bingo";
      }

      else {
        button.innerHTML = "X";
      }

      button.dataset.buzzWord = element.buzzWord;
      button.dataset.points = element.points;

      docfrag.appendChild(h2);
      docfrag.appendChild(h3);
      docfrag.appendChild(button);

      buzzWordList.appendChild(docfrag);
    });
  });
  gbReq.open("GET", "http://localhost:3001/buzzword");
  gbReq.send();
});

buzzWordList.addEventListener('click', function(event){
  var buzzWord = event.target.dataset.buzzWord;

  if(buzzWord && event.target.innerHTML !== "Bingo!"){
    var bingo = new XMLHttpRequest();
    bingo.addEventListener('load', function(){
      var score = document.getElementById('score');
      event.target.innerHTML = "Bingo!";
      var currentScore = Number(score.innerHTML);
      score.innerHTML = Number(currentScore) + Number(event.target.dataset.points);
    });
    bingo.open("PUT", "http://localhost:3001/buzzword");
    bingo.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    bingo.send("buzzWord=" + event.target.dataset.buzzWord + "&heard=true");
  }
});

reset.addEventListener('click', function(){
  var reset = new XMLHttpRequest();
  reset.addEventListener('load', function(){
    buzzWordList.innerHTML = "";
  });
  reset.open("POST", "http://localhost:3001/reset");
  reset.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  reset.send("reset=true");
});