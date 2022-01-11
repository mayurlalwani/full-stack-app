const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const userRoutes = require("./routes/index");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/users", userRoutes);

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);