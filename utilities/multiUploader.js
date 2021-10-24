const multer = require("multer");
const path = require("path");
const createError = require("http-errors");
var multerS3 = require("multer-s3");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
});

function uploader(
  subfolder_path,
  campaign_identifirer,
  allowed_file_types,
  max_file_size,
  max_number_of_files,
  error_msg
) {
  // preapre the final multer upload object
  const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: "metigy-campaign-contacts",
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        //Remove file origianl name
        req.campaign_identifirer = campaign_identifirer;
        const fileExt = path.extname(file.originalname);

        const fileName = Date.now();
        // Add campain id for trace campaign contacts
        cb(null, `${campaign_identifirer}__${fileName}${fileExt}`);
      },
    }),
    limits: {
      // Check file size
      fileSize: max_file_size,
    },
    fileFilter: (req, file, cb) => {
      console.log(req.files);
      if (req.files.length > max_number_of_files) {
        cb(
          createError(
            `Maximum ${max_number_of_files} files are allowed to upload!`
          )
        );
      } else {
        if (allowed_file_types.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(createError(error_msg));
        }
      }
    },
  });

  return upload;
}

module.exports = uploader;
