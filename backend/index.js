const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");

const allRoutes = require("./routes/index");

const nodemailer = require("nodemailer");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const EMAIL = process.env.EMAIL;
const PASS = process.env.PASS;

const transport = {
  host: "smtp.gmail.com",
  auth: {
    user: EMAIL,
    pass: PASS,
  },
};

const transporter = nodemailer.createTransport(transport);

//Verifying the Nodemailer Transport instance
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take messages");
  }
});

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/users", allRoutes);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
