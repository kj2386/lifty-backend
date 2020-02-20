const express = require('express');
const router = express.Router();
const Exercise = require('../db/models/Exercise');

router.get('/', (req, res) => {
  Exercise.find({}).then(exercises => res.json(exercises));
});

router.get('/:id', (req, res) => {
  Exercise.findById(req.params.id).then(exercise => {
    res.json(exercise);
  });
});

router.post('/', (req, res) => {
  Exercise.create(req.body).then(exercise => res.json(exercise));
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
    res.json(exercise);
  });
});

module.exports = router;
