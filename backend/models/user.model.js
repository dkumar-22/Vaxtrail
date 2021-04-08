const mongoose = require("mongoose");
const hospital = require("./hospital.model");
const vaccine = require("./vaccine.model");
const registered = require("./registered.model");
const Schema = mongoose.Schema;

const user = new Schema(
  {
    hospital:{type: hospital.locationSchema},
    vaccine:{type: vaccine.vaccineSchema},
    registered:{type: registered.registeredSchema},
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    password: { type: String },
  }
);

const User = mongoose.model("User", user);

module.exports = User;
