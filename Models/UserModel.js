const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  posts: [{
    type: ObjectId,
    ref: "blog"
  }],
  likes: [{
    type: ObjectId,
    ref: "blog"
  }],
  saves: [{
    type: ObjectId,
    ref: "blog"
  }],
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
