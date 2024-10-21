const asyncHandler = require("express-async-handler");
const Prediction = require("../models/Prediction");
const TravelPlan = require("../models/TravelPlan"); 
const axios = require("axios");

const addPrediction = asyncHandler(async (req, res) => {
  const { budget, destination, number_of_days, visitor_count } = req.body;

  if (!budget || !destination || !number_of_days || !visitor_count) {
    return res.status(400).json({
      error: "Please fill all the fields",
    });
  }

  if (budget < 100) {
    return res.status(400).json({
      error:
        "The budget is too low to make any prediction. Please enter a higher budget.",
    });
  }

  if (number_of_days <= 0) {
    return res.status(400).json({
      error: "The number of days should be greater than zero.",
    });
  }

  if (visitor_count <= 0) {
    return res.status(400).json({
      error: "The visitor count should be greater than zero.",
    });
  }

  const minBudgetPerVisitor = 50;  
  const totalMinimumBudget = minBudgetPerVisitor * visitor_count;

  if (budget < totalMinimumBudget) {
    return res.status(400).json({
      error: `The budget is too low for ${visitor_count} visitors. The minimum required budget for ${visitor_count} visitor(s) is ${totalMinimumBudget}.`,
    });
  }

  console.log("budget " + budget);
  console.log("destination " + destination);
  console.log("number_of_days " + number_of_days);
  console.log("visitor_count " + visitor_count);

  const predictionResult = await Prediction.create({
    budget,
    destination,
    number_of_days,
    visitor_count,
  });

  try {
    const response = await axios.post("http://127.0.0.1:5000/", {
      budget,
      destination,
      number_of_days,
      visitor_count,
    });

    console.log(response.data);

    const { Budget_Friendly, Mid_Range, High_End } = response.data;

    
    const budgetPlanTypes = [];
    if (Budget_Friendly) budgetPlanTypes.push("Budget_Friendly");
    if (Mid_Range) budgetPlanTypes.push("Mid_Range");
    if (High_End) budgetPlanTypes.push("High_End");

    
    const travelPlans = await TravelPlan.findOne(
      { DesiredArea: destination },
      { BudgetPlans: 1 }
    );

    if (!travelPlans) {
      return res.status(404).json({
        error: "No travel plans found for the specified destination.",
        status: 404
      });
    }

   
    const selectedPlans = travelPlans.BudgetPlans.filter((plan) =>
      budgetPlanTypes.includes(plan.type)
    );

    return res.status(200).json({
      message: "Prediction added and processed successfully!",
      predictionResponse: response.data,
      travelPlans: selectedPlans,
      status: 200,
    });

  } catch (error) {
    console.log(error);

    if (error.response && error.response.status === 400) {
      return res.status(400).json({
        error: error.response.data.message || "Invalid input provided to Flask API.",
        status: 400
      });
    }

    res.status(500).json({
      error: "Failed to process prediction",
      status: 500
    });
  }
});

module.exports = {
  addPrediction,
};
