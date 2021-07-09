const router = require("express").Router();
const bcrypt = require('bcrypt');


// Importing .ENV Data
const saltRounds = parseInt(process.env.SALT);

// Importing User DB Model
const User = require("../../Models/UserModel");


// User Register Route
router.post('/register', async (req, res) => {
    let { firstName, lastName, username, email, password } = req.body;
    var hashedPassword = await bcrypt.hash(password, saltRounds);

    let newUser = new User({
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword
    });

    newUser.save((err, result) => {
        if (err) {
            return res.status(400).json({ message: "Error in saving user in Db" })
        }
        res.status(200).json({
            status: 200,
            data: {
                result
            }
        })
    })
});

router.post("/login", async (req, res) => {
    let { email, password } = req.body;
    const user = await User.findOne({ email: email })
    if (user) {
        const hashResult = await bcrypt.compare(password, user.password);

        if (hashResult) {
            const token = await user.generateAuthToken();
            // console.log(token);
            res.status(200).json({
                data: user,
                token: token
            });
        }
        else {
            res.status(400).json({ message: "Wrong Password" })
        }
    }
    else {
        res.status(400).json({ message: "Email Not Found" })
    }
});



module.exports = router;