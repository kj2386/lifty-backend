const mongoose = require('../connection');

const WorkoutSchema = new mongoose.Schema({
  date: String,
  exercise: [
    {
      id: Number,
      exercise: String,
      sets: Number,
      reps: Number,
      weight: Number
    }
  ]
});

const Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout;
