require("dotenv").config();

const express = require("express");
const router = express.Router();
const {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  getSeminarDetails,
} = require("../controllers/student-controller");

const protect = require("../middlewares/authMiddleware");

router.post("/", registerUser);
router.post("/login", authUser);
router.get("/profile/:id", getUserProfile);
router.put("/profile/:id", updateUserProfile);
router.get("/seminars", getSeminarDetails);

module.exports = router;
