const mongoose = require("mongoose");

const predictionSchema = mongoose.Schema(
  {
    budget: { type: "number", required: true },
    destination: { type: "String", required: true },
    number_of_days: { type: "number", required: true },
    visitor_count: { type: "number", required: true },
  },
  {
    timestapms: true,
  }
);

const Prediction = mongoose.model("Prediction", predictionSchema);

module.exports = Prediction;