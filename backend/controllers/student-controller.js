const Students = require("../models/student");
const asyncHandler = require("express-async-handler");
const generateToken = require("./../utils/generateToken");
const bcrypt = require("bcryptjs");

// @desc Register a new stident
// @route POST /api/student/
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const userExists = await Students.findOne({ where: { email } });
  if (userExists) {
    res.status(400);
    throw new Error("Student already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = await Students.create({
    first_name: firstName,
    last_name: lastName,
    email,
    password: hashPassword,
  });
  if (user) {
    res.status(201).json({
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid data");
  }
});

module.exports = { registerUser };
