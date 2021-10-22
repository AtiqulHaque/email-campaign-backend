const Response = require("../utilities/response");
const db = require("../models");
const Campaign = db.CampaignModel;
const Contact = db.ContactModel;
const Op = db.Sequelize.Op;

async function getAllCampaign(req, res, next) {
  try {
    let fieldList = [
      "campaigns_name",
      "email_subject",
      "email_body",
      "status",
      "created_at",
      "schedule_time",
      "total_contacts",
      "unique_identifier",
    ];
    await Campaign.findAll({ attributes: fieldList })
      .then((data) => {
        res.json(Response.success(data, Response.startTime));
      })
      .catch((err) => {
        res.status(500).json(Response.errorWithMessage(err.message));
      });
  } catch (err) {
    next(err);
  }
}
async function getCampaignContacts(req, res, next) {
  try {
    let fieldList = [
      "contact_id",
      "name",
      "email",
      "send_at",
      "status",
      "campaign_indentifier",
      "created_at",
    ];
    await Contact.findAll({ attributes: fieldList })
      .then((data) => {
        res.json(Response.success(data, Response.startTime));
      })
      .catch((err) => {
        res.status(500).json(Response.errorWithMessage(err.message));
      });
  } catch (err) {
    next(err);
  }
}

async function addCampaign(req, res, next) {
  try {
    const campaignData = {
      campaigns_name: req.body.campaigns_name,
      email_body: req.body.body,
      email_subject: req.body.subject,
      status: req.body.status,
      schedule_time: req.body.scheduleDateTime,
      unique_identifier: req.campaign_identifirer,
      personalize_text: req.body.personalize_text,
    };
    console.log(campaignData);
    Campaign.create(campaignData)
      .then((data) => {
        res.json(Response.success(data, Response.startTime));
      })
      .catch((err) => {
        res.status(500).json(err.message);
      });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllCampaign,
  addCampaign,
  getCampaignContacts,
};
