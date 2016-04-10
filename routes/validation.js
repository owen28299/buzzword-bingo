function validateRequest(req,res,next){

  var valid = {
    POST : {
      "/reset" : {
        reset : "true"
      },
      "/buzzword" : {
        buzzWord : "string",
        points : "number"
      }
    },

    PUT : {
      "/buzzword" : {
        buzzWord : "string",
        heard : "boolean"
      }
    },

    DELETE : {
      "/buzzword" : {
        buzzWord : "string"
      }
    }
  };

  var url = req.originalUrl;
  var method = req.method;

  if(method === "GET"){
    return next();
  }

  var body = req.body;

  var validObj = valid[method][url];
  var inputObj = req.body;

  if(Object.keys(req.body).length === 0){

    return res.json({
      success: false,
      error: "invalid inputs"
    });
  }

  var match = true;

  for (var prop in inputObj){

    if(validObj[prop] === undefined){

      match = false;
      break;
    }

    if(validObj[prop] !== typeof inputObj[prop] &&
      (validObj[prop] !== inputObj[prop])){

      if( validObj[prop] === 'number' && isNaN(Number(inputObj[prop])) ){
        match = false;
        break;
      }
      else if(validObj[prop] === 'boolean' &&
      inputObj[prop] !== 'true') {
        match = false;
        break;
      }
    }
  }

  if(match === true){
    return next();
  }

  else{
    res.json({
      success: false,
      error: "invalid inputs"
    });
  }

}

module.exports = validateRequest;