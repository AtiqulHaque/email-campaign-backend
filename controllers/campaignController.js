const Response = require("../utilities/response");
const db = require("../models");
const Campaign = db.CampaignModel;
const Contact = db.ContactModel;
const { check, oneOf, validationResult } = require("express-validator");
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
      "isScheduled",
    ];
    await Campaign.findAll({ attributes: fieldList })
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
async function getCampaignContacts(req, res, next) {
  try {
    let fieldList = [
      "id",
      "name",
      "email",
      "send_at",
      "status",
      "campaign_indentifier",
      "created_at",
    ];
    await Contact.findAll({
      where: {
        campaign_indentifier: req.params.identifier,
      },
      attributes: fieldList,
    })
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
      status: 0,
      schedule_time: req.body.scheduleDateTime,
      unique_identifier: req.campaign_identifirer,
      isScheduled: req.body.is_schedule,
    };

    if (req.body.is_schedule == 0) {
      delete campaignData.schedule_time;
    }

    console.log(campaignData, req.body.is_schedule);
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
