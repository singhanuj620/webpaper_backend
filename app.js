// IMPORTING DEPENDENCAIES
var express = require("express");
app = express();

app.get("/api/sample", (req, res) => {
  res.status(200).json({
    message: "Working",
    author: "Anuj Singh",
  });
});

// STARTING SERVER
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
