const mongoose = require("mongoose");

const vaccineSchema = mongoose.Schema({
  name: String,
  about: String,
  website: String,
  status: String,
  efficacy: Number
});

const Vaccine = mongoose.model("Vaccine", vaccineSchema);

module.exports = Vaccine;
