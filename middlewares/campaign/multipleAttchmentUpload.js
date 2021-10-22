const { v4: uuidv4 } = require("uuid");

const uploader = require("../../utilities/multiUploader");

function multipleAttchmentUpload(req, res, next) {
  const upload = uploader(
    "attachments",
    uuidv4(),
    [("application/vnd.ms-excel", "text/csv")],
    1000000,
    5,
    "Only .csv format allowed! and Max 5 files"
  );

  // call the middleware function
  upload.any()(req, res, (err) => {
    if (err) {
      res.status(500).json({
        errors: {
          attachments: {
            msg: err.message,
          },
        },
      });
    } else {
      next();
    }
  });
}

module.exports = multipleAttchmentUpload;
