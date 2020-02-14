const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');

const api = supertest('http://localhost:3000/lifty');

describe('GET /exercise', () => {
  it('should return a 200 response', done => {
    api
      .get('/exercise')
      .set('Accept', 'application/json')
      .expect(200, done);
  });
});

describe('GET /exercise/:id', () => {
  it('should return one exercise with correct fields', done => {
    api
      .get('/exercise/5e47113c1133bb54f4ba8eda')
      .set('Accept', 'application/json')
      .end((error, response) => {
        const exercise = response.body;
        expect(exercise).to.include.all.keys('_id','name', 'sets', 'workout');
        done();
      });
  });
});
