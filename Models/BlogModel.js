const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const blogSchema = new Schema({
  title: String,
  content: String,
  author: {
    type: ObjectId,
    ref: "user"
  },
  likes: {
    type: Number,
    default: 0
  },
  saves: {
    type: Number,
    default: 0
  },
  poster: { data: Buffer, posterType: { type: String, default: "png" } }
},
  { timestamps: true });

const Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;
