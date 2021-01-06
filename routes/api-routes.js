const express = require ("express");
const router = express.Router();

const db = require ("../models");

router.get ("/api/workouts", (req, res) => {
    db.Workout.find().then((workout) => {
        res.json(workout);
    })
    .catch((err) => {
        console.log(err);
        res.json({
            error: true,
            data: null,
            message: "No workouts found."
        });
    });
});

router.post ("/api/workouts", (req, res) => {
    db.Workout.create(req.body).then((newWorkout) => {
        res.json(newWorkout);
    })
    .catch((err) => {
        console.log(err);
        res.json({
            error: true,
            data: null,
            message: "No workouts added."
        });
    });
});
router.put ("/api/workouts/:id", (req, res) => {
    db.Workout.findByIdAndUpdate(req.params.id, {
        $push: {exercises : req.body},

    }).then((updatedWorkout) => {
        res.json(updatedWorkout);
    })
    .catch((err) => {
        console.log(err);
        res.json({
            error: true,
            data: null,
            message: "No workouts updated."
        });
    });
});

module.exports = router;