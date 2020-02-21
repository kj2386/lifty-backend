const express = require('express');
const router = express.Router();
const Exercise = require('../db/models/Exercise');
const Workout = require('../db/models/Workout');

router.get('/', (req, res) => {
  Exercise.find({})
    .populate('workout')
    .then(exercises => res.json(exercises));
});

router.get('/:id', (req, res) => {
  Exercise.findById(req.params.id).then(exercise => {
    res.json(exercise);
  });
});

router.post('/', (req, res, next) => {
  Exercise.create({
    name: req.body.name,
    sets: req.body.sets,
    workout: req.body.workout
  })
    .then(exercise => res.json(exercise))

    .catch(next);
});

router.put('/:id', (req, res) => {
  Exercise.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true
  }).then(exercise => res.json(exercise));
});

router.delete('/:id/:setId', (req, res) => {
  Exercise.findOneAndUpdate(
    { _id: req.params.id },
    {
      $pull: {
        sets: { _id: req.params.setId }
      }
    }
  ).then(set => {
    res.json(set);
  });
});

router.delete('/:id', (req, res) => {
  Exercise.findOneAndRemove({ _id: req.params.id }).then(exercise => {
    res.sendStatus(204);
  });
});

module.exports = router;
