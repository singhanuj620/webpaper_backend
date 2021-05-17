const router = require("express").Router();

const Blog = require("../../Models/BlogModel");

const multer = require("multer");
const upload = multer({
  limits: {
    fileSize: 2000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      cb(new Error('Please upload an image.'))
    }
    cb(undefined, true)
  }
});

// Creation of new blog
router.post("/create", upload.single('poster'), (req, res) => {
  let { title, author, content, posterType } = req.body;
  let poster = req.file.buffer;
  let newBlog = new Blog({
    title: title,
    content: content,
    author: author,
    poster: { data: poster, posterType: posterType }
  });

  newBlog.save((err, result) => {
    if (err) {
      return res.status(400).json({ message: "Error in saving blog post in Db" })
    }
    res.status(200).json({
      status: 200,
      data: {
        blogId: result._id
      }
    })
  })
});


// Fetching of blog from _id
router.get("/:blogId", (req, res) => {
  let { blogId } = req.params;
  let newBlog = Blog.find({ _id: blogId });
  newBlog.exec((err, result) => {
    if (err) {
      return res.status(400).json({ message: "Error from fetching blog post in Db" })
    }
    res.status(200).json({
      result: result[0]
    });
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
    if (err) {
      return res.json({ message: err })
    }
    res.json({ message: result })
  });
})

router.get("/*", (req, res) => {
  res.status(400).json({
    error: "Page Not Found",
  });
});

module.exports = router;
