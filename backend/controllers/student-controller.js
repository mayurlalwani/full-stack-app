const Students = require("../models/student");
const Seminars = require("../models/seminar");
const Hobbies = require("../models/hobbies");
const StudentHobby = require("../models/student_hobby");
const asyncHandler = require("express-async-handler");
const generateToken = require("./../utils/generateToken");
const bcrypt = require("bcryptjs");
const ejs = require("ejs");
const nodemailer = require("nodemailer");
const { QueryTypes } = require("sequelize");

const EMAIL = process.env.EMAIL;
const PASS = process.env.PASS;

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
      id: user.id,
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
  const hobbies = await Hobbies.sequelize.query(
    {
      query: `SELECT h.hobby_name, s.id FROM hobbies AS h LEFT JOIN student_hobby AS sh ON h.id=sh.hobby_id LEFT JOIN students AS s ON s.id=sh.user_id WHERE s.id=? `,
      values: [userId],
    },
    {
      type: QueryTypes.SELECT,
    }
  );
  if (user) {
    res.json({
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      hobbies,
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

const sendEmail = asyncHandler(async (req, res) => {
  const { name, seminarName, seminarDate, email } = req.body;
  const transport = {
    host: "smtp.gmail.com",
    service: "gmail",
    secure: false,
    auth: {
      type: "PLAIN",
      user: EMAIL,
      pass: PASS,
    },
    port: 465,
    secure: true,
    requireTLS: true,
    logger: false,
    debug: false,
    tls: { rejectUnauthorized: false },
  };
  const transporter = nodemailer.createTransport(transport);
  ejs.renderFile(
    __dirname + "/email-template.ejs",
    { name: name, seminarName, seminarDate },
    function (err, data) {
      if (err) {
      } else {
        var mainOptions = {
          from: "lalwanimayur06@gmail.com",
          to: email,
          subject: "Seminar details",
          html: data,
        };

        transporter.sendMail(mainOptions, function (err, info) {
          if (err) {
            res.json({
              msg: "Something went wrong!",
              err,
            });
          } else {
            res.json({
              msg: "Email sent successfully!",
            });
          }
        });
      }
    }
  );
});

module.exports = {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  getSeminarDetails,
  sendEmail,
};
