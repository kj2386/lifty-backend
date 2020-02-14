const mongoose = require('./connection');
const Workout = require('./models/Workout');
const Exercise = require('./models/Exercise');

Workout.deleteMany({}).then(() => {
  console.log('deleted all workouts');
  Exercise.deleteMany({}).then(() => {
    console.log('deleted all exercises');

    Workout.create({
      date: '2020-02-14'
    }).then(workout1 => {
      Exercise.create({
        name: 'Bench press',
        sets: [
          {
            setNumber: 1,
            reps: 10,
            weight: 145
          },
          {
            setNumber: 2,
            reps: 10,
            weight: 145
          },
          {
            setNumber: 3,
            reps: 10,
            weight: 145
          }
        ],
        workout: workout1.id
      }).then(exer1 => {
        workout1.exerciseList.push(exer1);
        workout1.save();
        console.log('ex1/wrk1 saved');

        Exercise.create({
          name: 'Lat pulldown',
          sets: [
            {
              setNumber: 1,
              reps: 8,
              weight: 155
            },
            {
              setNumber: 2,
              reps: 8,
              weight: 155
            },
            {
              setNumber: 3,
              reps: 8,
              weight: 155
            }
          ],
          workout: workout1.id
        }).then(exer2 => {
          workout1.exerciseList.push(exer2);
          workout1.save();
          console.log('ex2/wrk1 saved');
        });
      });
    });
  });
});
