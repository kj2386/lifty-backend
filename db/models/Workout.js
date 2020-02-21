const mongoose = require('../connection');

const WorkoutSchema = new mongoose.Schema({
  date: Date
});

const Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout;
