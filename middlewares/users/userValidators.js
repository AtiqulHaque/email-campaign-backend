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
  body("subject")
    .isLength({ min: 10 })
    .isLength({ max: 100 })
    .withMessage("Subject is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Subject must not contain anything other than alphabet")
    .trim(),
  body("body")
    .isLength({ min: 10 })
    .isLength({ max: 5000 })
    .withMessage("Invalid email addressbody")
    .trim(),
  body("scheduleDateTime")
    .notEmpty()
    .withMessage("Invalid Schedule Date time Date")
    .trim(),
  body("status").isBoolean().withMessage("Campaign Status must be  0 or 1"),
];

const addUserValidationHandler = function (req, res, next) {
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
};
