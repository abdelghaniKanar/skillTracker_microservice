const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
// db connection function
const connectDB = require("./src/config/dbConfig");

// to load the environment variables
dotenv.config();

// connect to the database
connectDB();

// create an Express app
const app = express();

// middleware to handle CORS
app.use(cors());

// middleware to parse incoming JSON requests
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.json({
    message: `Haapo!`,
  });
});

// competence routes
const competence = require("./src/routes/competence.route");
app.use("/api/competence", competence);

// start the server on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
