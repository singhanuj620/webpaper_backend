const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;

const blogSchema = new Schema({
  title: String,
  content: String,
  poster: String,
  author: {
      type : String,
      required : true
  },
  likes: {
    type : Number,
    default : 0
  },
  saves: {
    type : Number,
    default : 0
  },
});

const Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;
