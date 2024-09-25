// index.js
const express = require("express");
const bodyParser = require("body-parser");
const convertRoute = require("./src/routes/convertRoute");
var cors = require("cors");

const app = express();

// enabling CORS for some specific origins only.
app.use(
  cors({
    origin: "http://localhost:8080",
  })
);

app.use(bodyParser.json());
app.use(convertRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // Export for testing
