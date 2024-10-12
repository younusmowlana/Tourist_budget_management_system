const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  hotel_name: { type: String, required: true },
  hotel_img: { type: [String], required: true },
  hotel_price: { type: Number, required: true },
  transport_by: { type: String, required: true },
  near_by_attractions: [
    {
      name: { type: String, required: true },
      img: { type: String, required: true },
    }
  ],
  food_places: { type: [String], required: true },
  img: { type: [String], required: true }
});

const budgetPlanSchema = new mongoose.Schema({
  type: { type: String, required: true },
  hotels: [hotelSchema] 
});

const travelPlanSchema = new mongoose.Schema({
  DesiredArea: { type: String, required: true },
  BudgetPlans: [budgetPlanSchema] 
}, { timestamps: true });

module.exports = mongoose.model("TravelPlan", travelPlanSchema);
