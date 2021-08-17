//LOADING ENV VARIABLES:
require("dotenv").config();


// IMPORTING DEPENDENCAIES
var express = require("express");
app = express();

// Enabling Cross Origin Requests
var cors = require('cors')
app.use(cors({ credentials: true }));


const path = require('path');
const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));


//CONNECTING MONGODB
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const db_url = process.env.DB_URL;
mongoose
  .connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
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


// IMPORTING ROUTES


// User Authentication Route
const authRoutes = require("./Routes/Authentication/AuthRoute");
app.use("/api/auth/", authRoutes);


// Blog Routes
const blogRoutes = require("./Routes/Blog/BlogRoute");
app.use("/api/article/", blogRoutes);

// Profile Routes
const profileRoutes = require("./Routes/Profile/ProfileRoute");
app.use("/api/profile/", profileRoutes);


// STARTING SERVER
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
