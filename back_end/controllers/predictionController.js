const asyncHandler = require("express-async-handler");
const Prediction = require("../models/Prediction");
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

    console.log(response.data); // Logging Flask response
    res.status(200).json({
      message: "Prediction added and processed successfully!",
      predictionResponse: response.data,
    });
  } catch (error) {
    console.error("Error calling Flask API: ", error);
    res.status(500).json({
      error: "Failed to process prediction",
    });
  }
});

module.exports = {
  addPrediction,
};
