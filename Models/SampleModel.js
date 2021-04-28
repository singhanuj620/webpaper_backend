const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sampleSchema = new Schema({
  title: String,
  author: String,
  content: String
});

const Sample = mongoose.model("sample", sampleSchema);

module.exports = Sample;
