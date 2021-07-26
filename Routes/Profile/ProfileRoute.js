const router = require("express").Router();
const Authenticate = require("../../Middleware/Authenticate")

// Fetch LoggedIn user details
router.post("/", Authenticate, (req, res) => {
    // console.log(req.token)
    // console.log(req.userId)
    userData = { ...req.rootUser._doc }
    userData.password = ""
    userData.token = ""
    res.status(200).json({ data: userData })
})

// Fetch User Blogs
router.post("/posts", Authenticate, (req, res) => {
    res.status(200).json({ data: userData })
})

module.exports = router;