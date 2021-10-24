// external imports
const { body, validationResult } = require("express-validator");
const Response = require("../../utilities/response");

const addUserValidators = [
  body("campaigns_name", "Campaign name is required")
    .isLength({ min: 10 })
    .isLength({ max: 100 })
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Campaign name must not contain anything other than alphabet")
    .trim(),
  body(
    "subject",
    "Subject is required && Subject must not contain anything other than alphabet"
  )
    .isLength({ min: 10 })
    .isLength({ max: 100 })
    .withMessage("Subject is required")
    .isAlpha("en-US", { ignore: " -" })
    .trim(),
  body("body", "Invalid email addressbody")
    .isLength({ min: 10 })
    .isLength({ max: 5000 })
    .trim(),
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

module.exports = {
  addUserValidators,
  addUserValidationHandler,
};
