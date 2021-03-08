const express = require("express");
const router = express.Router();
const db = require("../models")

// gets the workouts
router.get("/workouts", (req, res) => {
    db.Workout.aggregate([
        {
          $addFields: {
            totalDuration: { $sum: "$exercises.duration" },
          },
        },
      ]).then((dbWorkouts) => {
        console.log(dbWorkouts)
       res.json(dbWorkouts)
    })
    .catch((err) => {
        res.status(422).json(err);
    })
});

// Adds a exercise to the workout
router.put('/workouts/:id', (req, res) => {
    let id = req.params.id
    let data = req.body

    db.Workout.findByIdAndUpdate(
        id, {$push: {exercises: data}}, {new: true, runValidators: true}
    ).then((workout) => {
        res.json(workout);
    }).catch((err) =>{
        res.status(422).json(err);
    })
});

// Makes a new workout
router.post("/workouts", (req, res) => {
    console.log(req.body)
    db.Workout.create(req.body)
    .then(newWorkout => {
        res.json(newWorkout);
    })
    .catch(err => {
        res.status(422).json(err);
    })
});

// Get workouts for
router.get("/workouts/range", (req, res) => {
    db.Workout.aggregate([
        {
          $addFields: {
            totalDuration: { $sum: "$exercises.duration" },
            totalWeight: { $sum: "$exercises.weight" },
          },
        },
      ])
        .sort({ _id: -1 }).limit(7)
        .then((workoutStats) => {
          res.json(workoutStats);
        })
        .catch((err) => {
          res.status(422).json(err);
        });
    });

module.exports = router;