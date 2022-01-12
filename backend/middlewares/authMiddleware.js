const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Students = require("../models/student");
const dotenv = require("dotenv");
dotenv.config();
const protect = asyncHandler(async (req, res, next) => {
  let token = req.headers.authorization.startsWith("Bearer");

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, "abc1234", (err, decoded) => {
    console.log(err);
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
});

module.exports = protect;
