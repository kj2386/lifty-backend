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
        expect(exercise).to.include.all.keys('_id', 'name', 'sets', 'workout');
        done();
      });
  });
});

describe('POST /exercise', () => {
  const newExercise = {
    name: 'Squats',
    sets: [
      {
        setNumber: 1,
        reps: 8,
        weight: 350
      }
    ],
    workout: ['5e47113c1133bb54f4ba8ed9']
  };

  before(done => {
    api
      .post('/exercise')
      .set('Accept', 'application/json')
      .send(newExercise)
      .end(done);
  });

  it('should add a new exercise to the workout', done => {
    api
      .get('/exercise')
      .set('Accept', 'application/json')
      .end((error, response) => {
        const exerciseToFind = response.body.find(
          exercise => exercise.id === newExercise.id
        );
        expect(exerciseToFind).to.be.an('object');
        done();
      });
  });
});

describe('DELETE /exercise/:id', () => {
  let idToDelete;

  before(done => {
    api
      .get('/exercise')
      .set('Accept', 'application/json')
      .end((error, response) => {
        const exercises = response.body;
        idToDelete = exercises[exercises.length - 1]._id;
        done();
      });
  });

  before(done => {
    api
      .delete(`/exercise/${idToDelete}`)
      .set('Accept', 'application/json')
      .end((error, response) => {
        done();
      });
  });

  it('should remove an exercise by id', done => {
    api
      .get('/exercise')
      .set('Accept', 'application/json')
      .end((error, response) => {
        const deletedExercise = response.body.find(
          exercise => exercise.id === idToDelete
        );
        expect(deletedExercise).to.equal(undefined);
        done();
      });
  });
});

describe('DELETE /exercise/:id/:setId', () => {
  let exId = '5e4eba286fe7384f18d47174';
  let setIdToDelete = '5e4eba286fe7384f18d47176';

  before(done => {
    api
      .delete(`/exercise/${exId}/${setIdToDelete}`)
      .set('Accept', 'application/json')
      .end((error, response) => {
        done();
      });
  });

  it('should remove a set by id', done => {
    api
      .get(`/exercise/${exId}`)
      .set('Accept', 'application/json')
      .end((error, response) => {
        const deletedSet = response.body.find(
          sets => sets.id === setIdToDelete
        );
        expect(deletedSet).to.equal(undefined);
        done();
      });
  });
});

describe('PUT /exercise/:id', () => {
  let exerciseToUpdate = {
    _id: '5e47113c1133bb54f4ba8ed9',
    name: 'Wide Bench Press'
  };

  before(done => {
    api
      .put(`/exercise/${exerciseToUpdate._id}/edit`)
      .set('Accept', 'application/json')
      .send(exerciseToUpdate)
      .end(done);
  });

  it('should update an exercise by id', done => {
    api
      .get(`/exercise/${exerciseToUpdate.id}`)
      .set('Accept', 'application/json')
      .send((error, response) => {
        expect(response.body.id).to.equal(exerciseToUpdate.id);
      });
    done();
  });
});
