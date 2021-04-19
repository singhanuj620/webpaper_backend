const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  designation: String,
});

const User = mongoose.model("user", userSchema);

module.exports = User;
