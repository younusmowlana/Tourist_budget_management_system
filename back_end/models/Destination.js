const mongoose = require("mongoose");

const DestinationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Destination", DestinationSchema);
