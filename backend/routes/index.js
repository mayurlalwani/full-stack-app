require("dotenv").config();

const express = require("express");
const router = express.Router();
const {
  registerUser,
  authUser,
  getUserProfile,
} = require("../controllers/student-controller");

const protect = require("../middlewares/authMiddleware");

router.post("/", registerUser);
router.post("/login", authUser);
router.get("/profile/:id", getUserProfile);

module.exports = router;
