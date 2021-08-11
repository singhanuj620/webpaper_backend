const router = require("express").Router();
const Authenticate = require("../../Middleware/Authenticate")
const User = require("../../Models/UserModel")



// Fetch LoggedIn Profile Data
router.post("/fetch", Authenticate, (req, res) => {
    try {
        let result = User.findOne({ _id: req.userId }).populate("posts")
        result.exec((err, userData) => {
            if (err) {
                return res.status(400).json({ message: "Error" })
            }
            userData.posts.reverse();
            for (i = 0; i < userData.posts.length; i++) {
                var imgBuffer = userData.posts[i].poster.data;
                var imgString = imgBuffer.toString('base64');
                var imgType = userData.posts[i].poster.posterType;
                var finalImgString = `data:image/${imgType};base64, ${imgString}`;
                var newResult = {
                    _id: userData.posts[i]._id,
                    title: userData.posts[i].title,
                    content: userData.posts[i].content,
                    likes: userData.posts[i].likes,
                    saves: userData.posts[i].saves,
                    author: {
                        _id: userData._id,
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        username: userData.username,
                    },
                    poster: finalImgString,
                    createdAt: userData.posts[i].createdAt,
                    updatedAt: userData.posts[i].updatedAt
                };
                userData.posts[i] = newResult
            }

            return res.status(200).json({ data: userData })
        })
    }
    catch (err) {
        return res.status(400).json({ message: "Error" })
    }
})

// Fetch General Profile Data
router.post("/user", (req, res) => {
    try {
        let result = User.findOne({ _id: req.body.userId }).populate("posts")
        result.exec((err, userData) => {
            if (err) {
                return res.status(400).json({ message: "Error" })
            }
            userData.posts.reverse();
            for (i = 0; i < userData.posts.length; i++) {
                var imgBuffer = userData.posts[i].poster.data;
                var imgString = imgBuffer.toString('base64');
                var imgType = userData.posts[i].poster.posterType;
                var finalImgString = `data:image/${imgType};base64, ${imgString}`;
                var newResult = {
                    _id: userData.posts[i]._id,
                    title: userData.posts[i].title,
                    content: userData.posts[i].content,
                    likes: userData.posts[i].likes,
                    saves: userData.posts[i].saves,
                    author: {
                        _id: userData._id,
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        username: userData.username,
                    },
                    poster: finalImgString,
                    createdAt: userData.posts[i].createdAt,
                    updatedAt: userData.posts[i].updatedAt
                };
                userData.posts[i] = newResult
            }

            return res.status(200).json({ data: userData })
        })
    }
    catch (err) {
        return res.status(400).json({ message: "Error" })
    }
})


// Fetch LoggedIn user details
router.post("/", Authenticate, (req, res) => {
    // console.log(req.token)
    // console.log(req.userId)
    userData = { ...req.rootUser._doc }
    userData.password = ""
    userData.token = ""
    return res.status(200).json({ data: userData })
})

module.exports = router;