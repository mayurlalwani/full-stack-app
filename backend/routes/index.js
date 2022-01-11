const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/student-controller");

router.post("/", registerUser);

module.exports = router;
