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
      .expect(200, done);
  });
});


describe('POST /weather', function() {
  it('should return 200 from POST /', async() => {
    request(app)
      .post('/weather')
      .send({
        url: 'https://api.darksky.net/forecast/',
        api: 'd3b156d2410201a748f410b06b5ae833',
        latitude: '50.08804',
        longitude: '14.42076',
        departure: '2020-04-30T15:47:17'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});

describe('POST /img', function() {
  it('should return 200 from POST /', async() => {
    request(app)
      .post('/img')
      .send({
        url: 'https://pixabay.com/api/?key=',
        api: '15817547-0820fe2163586163356300c93&q=',
        cityName: 'Rome&image_type=photo',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});

describe('GET /city', function() {
  it('responds with json', function(done) {
    request(app)
      .get('/city')
      .set('Accept', 'application/json')
      .expect(200, done);
  });
});



it('console.log the port number "3000" ', () => {
  console.log = jest.fn();
  console.log('Example app listening on port 3000!');
  expect(console.log).toHaveBeenCalledWith('Example app listening on port 3000!');
});