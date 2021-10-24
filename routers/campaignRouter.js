// external imports
const express = require("express");
const attchmentUploader = require("../middlewares/campaign/multipleAttchmentUpload");

// internal imports
const {
  addCampaign,
  getAllCampaign,
  getCampaignContacts,
} = require("../controllers/campaignController");

const {
  addUserValidators,
  addUserValidationHandler,
} = require("../middlewares/users/userValidators");
const router = express.Router();

router.post(
  "/add",
  attchmentUploader,
  addUserValidators,
  addUserValidationHandler,
  addCampaign
);

router.get("/lists", getAllCampaign);

router.get("/contact/lists/:identifier", getCampaignContacts);

module.exports = router;
