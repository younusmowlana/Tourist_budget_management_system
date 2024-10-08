const express = require("express");
const router = express.Router();

//importing all controller functions
const { addPrediction } = require("../controllers/predictionController");

//routing all end points
router.route("/").post(addPrediction);

module.exports = router;