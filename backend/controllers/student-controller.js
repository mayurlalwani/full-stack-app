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

// @desc Get Profile Details
// @route GET/api/users/profile
// @access Public. Make it private by adding middleware.
const getUserProfile = asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.id);

  const user = await Students.findOne({ where: { id: userId } });
  if (user) {
    res.json({
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = { registerUser, authUser, getUserProfile };
