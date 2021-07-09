const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  posts: { type: Array, default: [] },
  likes: { type: Array, default: [] },
  saves: { type: Array, default: [] },
  token: { type: String }
});

// Calling from /login auth route
userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET)
    this.token = token;
    await this.save();
    return token;
  }
  catch (err) {
    console.log(err);
  }
}

const User = mongoose.model("user", userSchema);

module.exports = User;
