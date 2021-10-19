const uploader = require("../../utilities/multipleUploader");

function attachmentUpload(req, res, next) {
  const upload = uploader(
    "attachments",
    ["application/vnd.ms-excel","text/csv"],
    1000000,
    2,
    "Only .csv format allowed!"
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

module.exports = attachmentUpload;
