const Students = require("../models/student");
const Seminars = require("../models/seminar");
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

// @desc Update Profile
// @route PUT/api/users/profile
// @access Public
const updateUserProfile = asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.id);

  const user = await Students.findOne({ where: { id: userId } });

  const { id, firstName, lastName, email, password } = req.body;
  if (user) {
    user.first_name = firstName || user.firstName;
    user.last_name = firstName || user.firstName;
    user.email = email || user.email;
    if (password) {
      user.password = password;
    }
    const updatedUser = await user.save();
    res.json({
      firstName: updatedUser.first_name,
      lastName: updatedUser.last_name,
      email: updatedUser.email,
      token: generateToken(updatedUser.id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Get Seminar Details
// @route GET/api/users/seminars
// @access Public. Make it private by adding middleware.
const getSeminarDetails = asyncHandler(async (req, res) => {
  const seminars = await Seminars.findAll();
  if (seminars) {
    res.status(200).send(seminars);
  } else {
    res.status(404);
    throw new Error("Something went wrong");
  }
});

module.exports = {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  getSeminarDetails,
};
