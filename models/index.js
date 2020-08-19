const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: Date,
    exercises: [
      {
        type: {type: String, required: true},
        name: {type: String, required: true},
        duration: {type: Number},
        distance: {type: Number},
        weight: {type: Number},
        reps: {type: Number, max: 200},
        sets: {type: Number, max: 20}
      }
    ]
  },);

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
