const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sampleSchema = new Schema({
  name: String,
  workingStatus: Boolean,
});

const Sample = mongoose.model("sample", sampleSchema);

module.exports = Sample;
