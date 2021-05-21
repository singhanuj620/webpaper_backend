const router = require("express").Router();

const Blog = require("../../Models/BlogModel");

const multer = require("multer");
const upload = multer({
  limits: {
    fileSize: 5000000,
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
    if (result.length == 0) {
      return res.status(400).json({
        error: "No Blog Found"
      });
    }
    var imgBuffer = result[0].poster.data;
    var imgString = imgBuffer.toString('base64');
    var imgType = result[0].poster.posterType;
    var finalImgString = `data:image/${imgType};base64, ${imgString}`;
    var newResult = {
      _id: result[0]._id,
      title: result[0].title,
      content: result[0].content,
      likes: result[0].likes,
      saves: result[0].saves,
      author: result[0].author,
      poster: finalImgString
    };
    res.status(200).json({
      result: newResult
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
