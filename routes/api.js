const router = require('express').Router();
const Workout = require('../models/');

router.get('/api/workouts', (req, res) => {
  Workout.find({})
    .sort({ day: 1 })
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// add exercises to a already existing workout
router.put('/api/workouts/:id', ({ body, params }, res) => {
  Workout.findOneAndUpdate(
    { _id: params.id },
    { $push: { exercises: body } },
    { new: true }
  ).then((dbWorkout) => {
    console.log(dbWorkout);
    res.json(dbWorkout);
  });
});

// create a workout
router.post('/api/workouts', ({ body }, res) => {
  Workout.create(body)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get('/api/workouts/range', (req, res) => {
  Workout.find({})
    .sort('-day')
    .limit(7)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
