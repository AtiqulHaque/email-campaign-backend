// external imports
const express = require("express");

// internal imports
const { signUp, login } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signUp);

router.post("/login", login);

module.exports = router;
