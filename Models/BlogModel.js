const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;

const blogSchema = new Schema({
  title: String,
  content: String,
  poster: String,
  author: {
      type : ObjectId,
      ref : "user"
  },
  likes: Number,
  saves: Number,
});

const Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;
