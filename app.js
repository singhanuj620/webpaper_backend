//LOADING ENV VARIABLES:
require("dotenv").config();

// IMPORTING DEPENDENCAIES
var express = require("express");
app = express();
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//CONNECTING MONGODB
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

// IMPORTING ROUTES
const blogRoutes = require("./Routes/Blog/BlogRoute");
app.use("/api/article/", blogRoutes);
// ROUTES

app.get("/api/sample", (req, res) => {
  res.status(200).json({
    message: "Working",
    author: "Anuj Singh",
  });
});

app.post("/api/sample/user", (req, res) => {
  let { name, designation } = req.body;
  const newUser = new User({
    name: name,
    designation: designation
  });

  newUser.save((err, result) => {
    if (err) {
      console.log("Error in saving db data");
    } else {
      res.status(200).json({
        message: "Recieved",
        result: result,
      });
    }
  });
});

app.post("/api/sample/:id", (req, res) => {
  let { name, workingStatus } = req.body;
  console.log(name, workingStatus);
  const newPerson = new Sample({
    name: name,
    workingStatus: workingStatus,
  });

  newPerson.save((err, result) => {
    if (err) {
      console.log("Error in saving db data");
    } else {
      res.status(200).json({
        message: "Recieved",
        result: result,
      });
    }
  });
});

// STARTING SERVER
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
