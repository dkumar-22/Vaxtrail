const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  contact: { type: String },
  website: { type: String },
  directions: { type: String },
  location: { type: Object, required: true },
});

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
