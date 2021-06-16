const router = require("express").Router();
const passport = require('passport');
var bcrypt = require('bcrypt');
var { checkAuthenticated, checkNotAuthenticated } = require('../Common/UserAuthCheck');

// Importing User DB Model
const User = require("../../Models/UserModel");

// router.get('/login', checkNotAuthenticated, (req, res) => {
//     res.redirect("/api/auth/successlogin");
// });

// router.get('/register', checkNotAuthenticated, (req, res) => {
//     res.redirect("/api/auth/successregister");
// });


// Registering New User and Saving In DB with encrypted password
router.post("/register", checkNotAuthenticated, async (req, res) => {
    var hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(hashedPassword)
    let newData = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    })
    newData.save((err, result) => {
        if (err) {
            return res.status(400).json({ message: "Error in saving user in Db" })
        }
        res.redirect("/api/auth/login");
    })
});


// Login Router with PassportJS Layer
router.post("/login", checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/api/auth/successRedirect',
    failureRedirect: '/api/auth/failureRedirect'
}))

// If Login Route Failed
router.get("/failureRedirect", (req, res) => {
    res.status(400).json({ message: "Not login" })
})

// If Login Router Succeed
router.get("/successRedirect", (req, res) => {
    res.status(200).json({ message: "login" })
})


// For Logout of logged in User
router.delete("/logout", (req, res) => {
    req.logOut();
    res.status(200).json({ message: "LoggedOut" })
})

// router.get("/successlogin", (req, res) => {
//     res.status(200).json({ message: "Success Login" })
// })

// router.get("/successregister", (req, res) => {
//     res.status(200).json({ message: "Success Register" })
// })


// Sample/Test API
router.get("/test", checkAuthenticated, (req, res) => {
    res.status(200).json({ message: "Reached" })
})


// Default Route
router.get("/*", (req, res) => {
    res.status(400).json({
        error: "No Auth Route for this",
    });
});

module.exports = router;