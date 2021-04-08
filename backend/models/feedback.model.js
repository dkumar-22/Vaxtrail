const mongoose = require("mongoose");
const registered = require("./registered.model");

const feedbackSchema = mongoose.Schema({
  userDetails: { type: registered.registeredSchema, required: true },
  health: { type: String, required: true },
  sideEffects: { type: String, required: true },  
  name: { type: String, required: true },  
  date: { type: String, required: true },  
  bid: { type: String, required: true },  
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports.Feedback = Feedback;
module.exports.feedbackSchema = feedbackSchema;