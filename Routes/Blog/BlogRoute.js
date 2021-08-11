const router = require("express").Router();

const Blog = require("../../Models/BlogModel");
const User = require("../../Models/UserModel")

// For Saving Poster Image for Blog Post
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
    (async () => {
      let saveBlogInUserModel = await User.findOne({ _id: author })
      saveBlogInUserModel.posts.push(result._id);
      saveBlogInUserModel.save();
    })();
    res.status(200).json({
      status: 200,
      data: {
        blogId: result._id
      }
    })
  })
});

// Fetching top 10 blog posts
router.get("/top10", (req, res) => {
  Blog.find({}).sort({ 'createdAt': -1 }).limit(10).populate("author").exec((err, result) => {
    if (err) {
      return res.status(400).json({ message: "Error in fetching top 10 blogs from db" })
    }
    for (let i = 0; i < result.length; i++) {
      var imgBuffer = result[i].poster.data;
      var imgString = imgBuffer.toString('base64');
      var imgType = result[i].poster.posterType;
      var finalImgString = `data:image/${imgType};base64, ${imgString}`;
      var temp = { ...result[i]._doc };
      temp.poster = finalImgString
      result[i] = temp;
    }
    // console.log(result[0])
    return res.status(200).json({
      data: result
    });
  });
});

// Fetching of blog from _id
router.get("/:blogId", (req, res) => {
  let { blogId } = req.params;
  let newBlog = Blog.find({ _id: blogId }).populate("author");
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
      poster: finalImgString,
      createdAt: result[0].createdAt,
      updatedAt: result[0].updatedAt
    };
    res.status(200).json({
      result: newResult
    });
  })

});


// Updating blog
router.post("/edit/:blogId", upload.single('poster'), (req, res) => {
  let blogId = req.params.blogId;
  let { title, author, content, posterType } = req.body;
  let newData = { title: title, author: author, content: content }
  if (posterType != "") {
    newData.poster = { data: req.file.buffer, posterType: posterType }
  }
  Blog.where({ _id: blogId }).updateOne(newData).exec((err, result) => {
    if (err) {
      return res.status(400).json({ message: "Error in updating blog post in Db" })
    }
    return res.status(200).json({
      status: 200,
      data: {
        blogId: blogId
      }
    })
  });
});


// Deleting the blog : 
router.get("/delete/:blogId", (req, res) => {
  const blogId = req.params.blogId;
  Blog.findOneAndRemove({ _id: blogId }).exec((err, result) => {
    if (err) {
      return res.status(400).json({ message: "Error in deleting blog post in Db" })
    }
    (async () => {
      console.log(result._id);
      let deleteFromUserModel = await User.findOne({ posts: result._id });
      let index = deleteFromUserModel.posts.indexOf(result._id)
      if (index > -1) {
        deleteFromUserModel.posts.splice(index, 1);
        deleteFromUserModel.save();
      }
    })();
    return res.status(200).json({
      status: 200
    });
  })
});

// Sample/Test APIs
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



// Default API
router.get("/*", (req, res) => {
  res.status(400).json({
    error: "Page Not Found",
  });
});

module.exports = router;
