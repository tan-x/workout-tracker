const router = require('express').Router();
const Workout = require('../models/');

router.get('/api/workouts', (req, res) => {
  Workout.find({})
    .sort({ date: -1 })
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// add exercises to a already existing workout
router.put('/api/workouts/:id', (req, res) => {
  Workout.findOne({ _id: req.params.id }).then((dbWorkout) => {
    dbWorkout.exercises.push(req.body);
    console.log(dbWorkout.exercises);
    Workout.findOneAndUpdate({ _id: req.params.id }, dbWorkout, {
      new: true,
    }).then((data) => res.json(data));
  });
});

router.post('/api/workouts', ({ body }, res) => {
  Workout.create(body)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post('/api/workouts/bulk', ({ body }, res) => {
  Workout.insertMany(body)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
