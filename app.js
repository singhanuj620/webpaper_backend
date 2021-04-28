//LOADING ENV VARIABLES:
require("dotenv").config();
var cors = require('cors')
// IMPORTING DEPENDENCAIES
var express = require("express");
app = express();
app.use(cors());
const path = require('path');
const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));
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

app.post("/api/sample", (req, res) => {
  let { title, author, content } = req.body;
  const newUser = {
    title: title ,
    author: author,
    content : content
  };
  console.log(newUser);
  res.status(200).json({message : newUser});
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
