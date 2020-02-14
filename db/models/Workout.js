const mongoose = require('../connection');

const WorkoutSchema = new mongoose.Schema({
  _id: Number,
  date: Date,
  exerciseList: [
    {
      ref: 'Exercise',
      type: mongoose.Schema.Types.ObjectId
    }
  ]
});

const Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout;
