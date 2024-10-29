const asyncHandler = require("express-async-handler");
const Prediction = require("../models/Prediction");
const TravelPlan = require("../models/TravelPlan"); 
const axios = require("axios");
const { error } = require("console");
const spawn = require("child_process").spawn; 

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



  const predictionResult = await Prediction.create({
    budget,
    destination,
    number_of_days,
    visitor_count,
  });

  try {
    const pythonProcess = spawn("python", [
      "./ML/main.py",
      budget,
      destination,
      number_of_days,
      visitor_count,
    ]);

    pythonProcess.stdout.on("data", async (data) => {
      const dataString = data.toString();
      console.log("Data Received from Python:", dataString);

      try {
        const parsedData = JSON.parse(dataString);

        if (parsedData.status === "error") {
          return res.status(400).json({
            error: parsedData.message,
            status: 400,
          });
        }

        const { Budget_Friendly, Mid_Range, High_End } = parsedData;
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
            status: 404,
          });
        }

        const selectedPlans = travelPlans.BudgetPlans.filter((plan) =>
          budgetPlanTypes.includes(plan.type)
        );

        return res.status(200).json({
          message: "Prediction added and processed successfully!",
          predictionResponse: parsedData,
          travelPlans: selectedPlans,
          status: 200,
        });
      } catch (error) {
        console.error("Error parsing JSON:", error);
        return res.status(500).json({
          error: "Failed to parse prediction response",
          status: 500,
        });
      }
    });

    pythonProcess.stderr.on("data", (error) => {
      console.error("Python Error:", error.toString());
    });

    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        console.error(`Python process exited with code ${code}`);
      }
    });
  } catch (error) {
    console.error("Error in getPrediction function:", error);
    res.status(500).json({
      error: "Failed to process prediction",
      status: 500,
    });
  }
});

module.exports = {
  addPrediction,
};