const mongoose = require("mongoose");

const registeredSchema = mongoose.Schema({
  fname: { type: String },
  lname: { type: String },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  zip: { type: String },
  phone: { type: String },
  email: { type: String },
  shospital: { type: Object },
  dob: { type: String },
  slot: { type: Object },
  appointmentDateandTime: { type: String },
  appointmentDate: { type: String },
  age: { type: Number },
  date:{type: String}
});

const Registered = mongoose.model("Registered", registeredSchema);

module.exports = Registered;
