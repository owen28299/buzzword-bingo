var request = require('supertest');
var app = require('../server.js');

describe('GET /buzzword', function(){
  it('should return a json file', function(done){
    request(app)
      .get('/buzzword')
      .expect(200, done)
      .expect('Content-Type', "application/json; charset=utf-8");
  });
});