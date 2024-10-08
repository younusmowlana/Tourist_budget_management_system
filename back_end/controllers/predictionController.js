const asyncHandler = require("express-async-handler");
const Prediction = require("../models/Prediction");
const { green } = require("colors");
const spawn = require("child_process").spawn;
const axios = require("axios");

const addPrediction = asyncHandler(async (req, res) => {
  var result;

  const { budget, destination, number_of_days, visitor_count } = req.body;

  if (!budget || !destination || !number_of_days || !visitor_count) {
    res.send(400).json({
      error: "Please fill all the fields",
    });
    throw new error("Please enter all the fields!!!");
  }

  console.log("budget " + budget);
  console.log("destination " + destination);
  console.log("number_of_days " + number_of_days);
  console.log("visitor_count " + visitor_count);
  console.log(budget, destination, number_of_days, visitor_count);

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
      flaskResponse: response.data,
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
