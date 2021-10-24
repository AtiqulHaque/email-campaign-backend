// external imports
const { body, validationResult } = require("express-validator");
const Response = require("../../utilities/response");
let addUserValidators = [
  body("campaigns_name", "Campaign name is required && max 200 ~ min 10")
    .not()
    .isEmpty()
    .trim()
    .isLength({ min: 10 })
    .isLength({ max: 200 })
    .escape(),
  body("subject", "Subject is required")
    .isLength({ min: 10 })
    .isLength({ max: 200 })
    .withMessage("Subject is required max 200 ~ min 10")
    .trim(),
  body("body", "Email body && max 200 ~ min 5000")
    .isLength({ min: 10 })
    .isLength({ max: 5000 })
    .trim(),
];

const campaignDetailsValidators = [
  body("identifier", "Only letters and digits allowed in title"),
];

const addUserValidationHandler = function (req, res, next) {
  const errors = validationResult(req);

  if (req.files.length == 0) {
    console.log(errors);
    errors.errors.push({
      value: "",
      msg: "Attachment Required must be *.csv files",
      param: "Attachments",
      location: "body",
    });
  }

  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res
      .status(400)
      .json(Response.validationError(mappedErrors, Response.startTime));
  }
};

const validationHandler = function (req, res, next) {
  const errors = validationResult(req);

  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res
      .status(400)
      .json(Response.validationError(mappedErrors, Response.startTime));
  }
};

module.exports = {
  addUserValidators,
  addUserValidationHandler,
  campaignDetailsValidators,
  validationHandler,
};
