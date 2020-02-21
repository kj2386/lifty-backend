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
  let workoutDoc;

  Workout.findById(req.params.id).then(workout => {
    workoutDoc = workout;
    Exercise.find({ workout: req.params.id }).then(exercises => {
      const response = {
        _id: workoutDoc._id,
        date: workoutDoc._date,
        exerciseList: exercises
      };

      res.json(response);
    });
  });
});

router.post('/', (req, res) => {
  Workout.create({ date: req.body.date, exerciseList: [] }).then(workout => {
    res.json(workout);
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

router.delete('/:id', (req, res) => {
  Workout.findOneAndRemove({ _id: req.params.id }).then(workout =>
    res.json(workout)
  );
});

module.exports = router;
