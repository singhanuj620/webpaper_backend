const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  title: String,
  image : Buffer
});

const Image = mongoose.model("image", imageSchema);

module.exports = Image;
