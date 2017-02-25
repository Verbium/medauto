
var request = require('supertest');
var api = require('../../index.js');

describe('GET /stats', function(){
  it('should response with episodes from Colony', function(done){
    var app = api();

    request(app.listen())
    .get('/search/tv/Colony')
    .expect({
      '@attributes': {"version":"2.0"}
    })
    .end(done);
  })
})