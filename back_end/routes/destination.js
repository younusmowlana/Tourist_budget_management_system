const Destination = require("../models/Destination");
const express = require("express");
const router = express.Router();

// GET ALL or SEARCH Destinations
router.get("/", async (req, res) => {
  try {
    const { name } = req.query;

    let query = {};

    if (name) {
      query.name = { $regex: name, $options: "i" };
    }

    const destinations = await Destination.find(query);
    res.status(200).json(destinations);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// CREATE A NEW Destination
router.post("/", async (req, res) => {
  const { name, longitude, latitude } = req.body;

  if (!name || longitude === undefined || latitude === undefined) {
    return res.status(400).json({ message: "Name, longitude, and latitude fields are required" });
  }

  try {
    const existingDestination = await Destination.findOne({ name });
    if (existingDestination) {
      return res.status(400).json({ message: "Destination already exists" });
    }

    const newDestination = new Destination({ name, longitude, latitude });
    await newDestination.save();

    res.status(201).json(newDestination);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

module.exports = router;