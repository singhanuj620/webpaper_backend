const jwt = require('jsonwebtoken');
const User = require('../Models/UserModel')

const Authenticate = async (req, res, next) => {
    try {
        const token = req.body.token;
        // console.log("From middleare " + token);
        const verifytoken = jwt.verify(token, process.env.SECRET);
        const rootUser = await User.findOne({ _id: verifytoken._id, "token": token });
        if (!rootUser) {
            throw new Error("User not found")
        }
        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;
        next();
    }
    catch (err) {
        res.status(400).json({ message: "Not Authenticated" })
        console.log(err);
    }
    next();
}

module.exports = Authenticate;