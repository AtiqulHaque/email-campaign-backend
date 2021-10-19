// external imports
const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const path = require("path");
const { unlink } = require("fs");
const Response = require("../../utilities/response");

const addUserValidators = [
  check("subject")
    .isLength({ min: 10 })
    .isLength({ max: 100 })
    .withMessage("Subject is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Subject must not contain anything other than alphabet")
    .trim(),
  check("body")
      .isLength({ min: 10 })
      .isLength({ max: 5000 })
    .withMessage("Invalid email addressbody")
    .trim(),
  check("scheduleDateTime")
      .isISO8601()
      .withMessage("Invalid Schedule Date time Date")
      .trim(),
  check("status")
      .isBoolean()
    .withMessage("Campaign Status must be  0 or 1")
  // ,
  // check("attachments").custom((value, { req }) => {
  //   console.log(req.files);
  //   if (!req.file) throw new Error("Attachments are required");
  //   return true;
  // })
];

const addUserValidationHandler = function (req, res, next) {
  const errors = validationResult(req);

  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  }
  else {
    // remove uploaded files
    if (typeof req.files === "object" && req.files.length > 0) {
      const { filename } = req.files[0];
      unlink(
        path.join(__dirname, `/../../public/uploads/avatars/${filename}`),
        (err) => {
          if (err) console.log(err);
        }
      );
    }

    res
      .status(400)
      .json(Response.validationError(mappedErrors, Response.startTime));
  }
};

module.exports = {
  addUserValidators,
  addUserValidationHandler
};
