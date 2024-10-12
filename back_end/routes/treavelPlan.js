const express = require('express');
const router = express.Router();
const TravelPlan = require('../models/TravelPlan'); 


router.post('/', async (req, res) => {
  try {
    const newTravelPlan = new TravelPlan({
      DesiredArea: req.body.DesiredArea,
      BudgetPlans: req.body.BudgetPlans
    });

    console.log("newTravelPlan:",newTravelPlan)
    const savedTravelPlan = await newTravelPlan.save();
    res.status(201).json(savedTravelPlan); 
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
