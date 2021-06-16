//LOADING ENV VARIABLES:
require("dotenv").config();


// IMPORTING DEPENDENCAIES
var express = require("express");
app = express();

// Enabling Cross Origin Requests
var cors = require('cors')
app.use(cors());

// Pre-Requisite for using Passport Js for User Authentication
const session = require('express-session');
const passport = require('passport');
var bcrypt = require('bcrypt');


app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));

const path = require('path');
const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));


//CONNECTING MONGODB
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const db_url = process.env.DB_URL;
mongoose
  .connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database Connection established");
  })
  .catch(() => {
    console.log("Database Connection Failed");
  });


// IMPORTING DB MODELS
const Sample = require("./Models/SampleModel");
const User = require("./Models/UserModel");
const Image = require("./Models/ImageModel");


// Initializing Passport JS in App.Js
const initializePassport = require("./PassportConfig");


const userEmail = async (email) => {
  var temp = await User.find({ email: email }).exec();
  return temp[0];
}

const userId = async (id) => {
  let temp = await User.find({ _id: id }).exec();
  return temp[0];
}

initializePassport(
  passport,
  email => userEmail(email),
  id => userId(id)
);

app.use(passport.initialize());
app.use(passport.session());


// IMPORTING ROUTES


// User Authentication Route
const authRoutes = require("./Routes/Authentication/AuthRoute");
app.use("/api/auth/", authRoutes);


// Blog Routes
const blogRoutes = require("./Routes/Blog/BlogRoute");
app.use("/api/article/", blogRoutes);


// Common ROUTES

// To Check from React side whether User is logged or not
app.get("/api/isLogged", (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({ data: req.user });
    // Req.User{
    //   _id: 
    //   username:
    //   email:
    //   password(encrypted)
    // }
  }
  else {
    return res.status(400).json({ data: "no" });
  }
})


// STARTING SERVER
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
