const router = require("express").Router();
const Authenticate = require("../../Middleware/Authenticate")

router.post("/", Authenticate, (req, res) => {
    // console.log(req.token)
    // console.log(req.userId)
    userData = { ...req.rootUser._doc }
    userData.password = ""
    userData.token = ""
    res.status(200).json({ data: userData })
})

module.exports = router;