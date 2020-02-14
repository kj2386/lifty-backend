const mongoose = require('../connection');

const ExerciseSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  sets: [
    {
      setNumber: Number,
      reps: Number,
      weight: Number
    }
  ],
  workout: [
    {
      ref: 'Workout',
      type: mongoose.Schema.Types.ObjectId
    }
  ]
});

const Exercise = mongoose.model('Exercise', ExerciseSchema);

module.exports = Exercise;
