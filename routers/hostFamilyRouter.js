// external imports
const express = require("express");

// internal imports
const {
  getHostFamily,
  addHostFamily,
  updateHostFamily,
  deleteHostFamily,
} = require("../controllers/hostFamilyControlle");

const avatarUpload = require("../middlewares/campaign/avatarUpload");

const {
  addHFamilyValidators,
  addHFamilyValidationHandler,
  updateHFamilyValidators,
} = require("../middlewares/users/hostFamilyValidators");

const checkLogin = require("../middlewares/checkLogin");

const router = express.Router();

router.get("/all", checkLogin, getHostFamily);

router.post(
  "/add",
  checkLogin,
  avatarUpload,
  addHFamilyValidators,
  addHFamilyValidationHandler,
  addHostFamily
);

router.put(
  "/update/:id",
  checkLogin,
  updateHFamilyValidators,
  addHFamilyValidationHandler,
  updateHostFamily
);

router.delete("/delete/:id", checkLogin, deleteHostFamily);

module.exports = router;
