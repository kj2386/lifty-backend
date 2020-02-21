const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');

const api = supertest('http://localhost:3000/lifty');

describe('GET /workout', () => {
  it('should return a 200 response', done => {
    api
      .get('/workout')
      .set('Accept', 'application/json')
      .expect(200, done);
  });
});

describe('GET /workout/:id', () => {
  it('should return on workout with the correct fields', done => {
    api
      .get('/workout/5e47113c1133bb54f4ba8ed9')
      .set('Accept', 'application/json')
      .end((error, response) => {
        const workout = response.body;
        expect(workout).to.include.all.keys('_id', 'date', 'exerciseList');
        done();
      });
  });
});

describe('POST /workout/:id', () => {
  const newExercise = {
    name: 'Squats',
    sets: [
      {
        setNumber: 1,
        reps: 8,
        weight: 350
      }
    ],
    workout: ['']
  };

  before(done => {
    api
      .post('/workout/5e4f3cd713dfc06ef8d22d09')
      .set('Accept', 'application/json')
      .send(newExercise)
      .end(done);
  });

  it('should add a new exercise to the workout', done => {
    api
      .get('/workout')
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


describe('POST /workout', () => {
  const newWorkout = {
    date: '2020-02-17',
    exerciseList: []
  };

  before(done => {
    api
      .post('/workout')
      .set('Accept', 'application/json')
      .send(newWorkout)
      .end(done);
  });

  it('should add a new workout with no exercise', done => {
    api
      .get('/workout')
      .set('Accept', 'application/json')
      .end((error, response) => {
        const workoutToFind = response.body.find(
          workout => workout.id === newWorkout.id
        );
        expect(workoutToFind).to.be.an('object');
        done();
      });
  });
});



describe('DELETE /workout/:id', () => {
  let idToDelete;

  before(done => {
    api
      .get('/workout')
      .set('Accept', 'application/json')
      .end((error, response) => {
        const workouts = response.body;
        idToDelete = workouts[workouts.length - 1]._id;
        done();
      });
  });

  before(done => {
    api
      .get(`/workouts/${idToDelete}`)
      .set('Accept', 'application/json')
      .end((error, response) => {
        done();
      });
  });

  it('should remove one workout', done => {
    api
      .get('/workout')
      .set('Accept', 'application/json')
      .end((error, response) => {
        const deletedWorkout = response.body.find(
          workout => workout.id === idToDelete
        );
        expect(deletedWorkout).to.equal(undefined);
        done();
      });
  });
});

describe('PUT /workout/:id', () => {
  let workoutToUpdate = {
    _id: '5e47113c1133bb54f4ba8ed9',
    date: '2020-02-17'
  };

  before(done => {
    api
      .get(`/workout.${workoutToUpdate._id}/edit`)
      .set('Accept', 'application/json')
      .send(workoutToUpdate)
      .end(done);
  });

  it('should update a workout by id', done => {
    api
      .get(`/workout/${workoutToUpdate.id}`)
      .set('Accept', 'application/json')
      .send((error, response) => {
        expect(response.body.id).to.equal(workoutToUpdate);
      });
    done();
  });
});
