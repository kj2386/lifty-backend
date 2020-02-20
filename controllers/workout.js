const express = require('express');
const router = express.Router();
const Workout = require('../db/models/Workout');
const Exercise = require('../db/models/Exercise');

router.get('/', (req, res) => {
  Workout.find({}).then(workouts => {
    res.json(workouts);
  });
});

router.get('/:id', (req, res) => {
  Workout.findById(req.params.id).then(workout => {
    Exercise.find(req.params.exId).then(exercises => {
      res.json(exercises);
    });
  });
});

router.post('/', (req, res) => {
  Workout.create(req.body).then(workout => res.json(workout));
});

router.post('/new', (req, res) => {
  Workout.create(req.body.workout).then(newWorkout => {
    Exercise.create(req.body.exercise).then(newExercise => {
      newWorkout.exerciseList.push(newExercise._id);
      newExercise.workout.push(newWorkout._id);

      newWorkout.save();
      newExercise.save();

      res.json(newWorkout);
    });
  });
});

router.put('/:id/:exerciseId', (req, res) => {
  let workoutId = req.params.id;
  let exerciseID = req.params.exerciseId;

  Exercise.findById(exerciseID).then(exId => {
    Workout.findOneAndUpdate({ _id: workoutId }).then(workout => {
      workout.exerciseList.push(exId._id);
      exId.workout.push(workout._id);

      workout.save();
      exId.save();

      res.json(workout);
    });
  });
});

router.put('/:id/edit', (req, res) => {
  Workout.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true
  }).then(workout => res.json(workout));
});

router.delete('/:id/:exerciseId/:setId', (req, res) => {
  let workoutId = req.params.id;
  let exerciseId = req.params.exerciseId;
  let setId = req.params.setId;

  
})

router.delete('/:id', (req, res) => {
  Workout.findOneAndRemove({ _id: req.params.id }).then(workout =>
    res.json(workout)
  );
});

module.exports = router;
