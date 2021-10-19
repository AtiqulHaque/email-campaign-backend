// external imports
const express = require("express");

// internal imports
const {
  addCampaignRouter,
    getAllCampaign
} = require("../controllers/campaignController");

const attachMentUpload = require("../middlewares/campaign/attachmentUpload");

const {
  addUserValidators,
  addUserValidationHandler,
  updateUserValidators,
} = require("../middlewares/users/userValidators");
const router = express.Router();


router.post(
    "/add",
    ...addUserValidators,
    addUserValidationHandler,
    addCampaignRouter
);


router.get("/lists", getAllCampaign);

module.exports = router;
