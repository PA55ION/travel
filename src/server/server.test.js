const app = require('../server/server.js')
const request = require('supertest')
jest.setTimeout(30000);

test('should get projectData', () => {
     let projectData = {};
    expect(projectData).toBeDefined();
  });


describe('GET /all', function() {
  it('responds with json', function(done) {
    request(app)
      .get('/all')
      .set('Accept', 'application/json')
    //   .expect('Content-Type', /json/)
      .expect(200, done);
  });
});


describe('POST /weather', function() {
  it('should return 200 from POST /', function(done) {
    request(app)
      .post('/weather')
      .send({url: 'https://api.darksky.net/forecast/d3b156d2410201a748f410b06b5ae833/51.50853,-0.12574,2020-04-30T20:36:28?units=auto'})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});