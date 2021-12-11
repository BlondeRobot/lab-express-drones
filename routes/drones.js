const express = require('express');
const router = express.Router();

// require the Drone model here
const Drone = require("../models/Drone.model");

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
    Drone.find()
      .then((returnedDrones) => {
        res.render("drones/list", { returnedDrones });
        console.log(returnedDrones);
      })
      .catch((error) => console.log("Error while finding drones occurred"));
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
    res.render("drones/create-form")
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  const { name, propellers, maxSpeed } = req.body;
  Drone.create({ name, propellers, maxSpeed })
    .then(() => res.redirect('/drones'))
    .catch((error) => console.log("Error while creating drone occurred"))
});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  const { id } = req.params;

  Drone.findById(id)
    .then((droneToEdit) => {
      res.render("drones/update-form", { droneToEdit })
    })
    .catch((error) => next(error));
});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  const { id } = req.params;
  const { name, propellers, maxSpeed } = req.body;
  
  Drone.findByIdAndUpdate(id, { name, propellers, maxSpeed })
    .then(() => res.redirect("/drones"))
    .catch((error) => console.log("Error while updating drone occurred"));
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  const { id } = req.params;
  Drone.findByIdAndDelete(id)
    .then(() => res.redirect("/drones"))
    .catch((error) => console.log("Error while deleting drone occurred"));
});

module.exports = router;
