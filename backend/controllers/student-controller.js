const Students = require("../models/student");
const asyncHandler = require("express-async-handler");
const generateToken = require("./../utils/generateToken");
const bcrypt = require("bcryptjs");

// @desc Register a new stident
// @route POST /api/users/
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
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid data");
  }
});

// @desc Auth user & get a token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await Students.findOne({ where: { email } });
  console.log({ user });
  const matchPassword = await bcrypt.compare(password, user.password);

  if (user && (await matchPassword)) {
    res.json({
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

module.exports = { registerUser, authUser };
