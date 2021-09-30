// external imports
const express = require("express");

// internal imports
const {
  getAupair,
  addAupair,
  updateAupair,
  deleteAupair,
} = require("../controllers/aupairController");

const avatarUpload = require("../middlewares/users/avatarUpload");

const {
  addUserValidators,
  addUserValidationHandler,
  updateUserValidators,
} = require("../middlewares/users/userValidators");
const checkLogin = require("./../middlewares/checkLogin");
const router = express.Router();

router.get("/all", checkLogin, getAupair);

router.post(
  "/add",
  checkLogin,
  avatarUpload,
  addUserValidators,
  addUserValidationHandler,
  addAupair
);

router.put(
  "/update/:id",
  checkLogin,
  updateUserValidators,
  addUserValidationHandler,
  updateAupair
);

router.delete("/delete/:id", checkLogin, deleteAupair);

module.exports = router;
