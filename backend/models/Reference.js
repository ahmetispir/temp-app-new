const mongoose = require("mongoose");

const referenceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  info: { type: String, required: true },
  service: { type: String, required: true },
});

module.exports = mongoose.model("Reference", referenceSchema);
