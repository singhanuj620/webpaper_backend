const router = require("express").Router();

const Blog = require("../../Models/BlogModel");

router.post("/abhinav", (req, res) => {
  let {title, content, poster, author, likes, saves} = req.body ;
  let newBlog = new Blog({
    title : title,
    content : content,
    poster : poster,
    author : author,
    likes : likes,
    saves : saves
  });

  newBlog.save((err, result) => {
    if(err){
      res.status(400).json({message : "Error in saving blog post"})
    }
    res.status(200).json({message : "Success"})
  })
});

router.get("/abhinav", (req, res) => {
  // Blog.find({}, (err, result) => {
  //   if(err){
  //     res.status(200).json({message : "Error in fetching blog from DB"})
  //   }
  //   res.status(200).json({data : result})
  // });

  Blog.find({}).populate("author").exec((err, result) => {
    if(err){
      return res.json({message : err})
    }
    res.json({message : result})
  });
})

router.get("/*", (req, res) => {
  res.status(400).json({
    error: "Page Not Found",
  });
});

module.exports = router;
