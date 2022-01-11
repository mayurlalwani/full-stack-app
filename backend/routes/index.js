require("dotenv").config();

const express = require("express");
const router = express.Router();
const { registerUser, authUser } = require("../controllers/student-controller");

router.post("/", registerUser);
router.post("/login", authUser);

module.exports = router;
