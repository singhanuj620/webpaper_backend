const router = require("express").Router();

const Blog = require("../../Models/BlogModel");

router.post("/create", (req, res) => {
  let {title, author, content} = req.body ;
  let newBlog = new Blog({
    title : title,
    content : content,
    author : author
  });

  newBlog.save((err, result) => {
    if(err){
      return res.status(400).json({message : "Error in saving blog post in Db"})
    }
    console.log(result)
    res.status(200).json({
        status: 200,
        data: {
            blogId: result._id
        }
    })
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
