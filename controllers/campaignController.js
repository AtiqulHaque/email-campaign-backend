const bcrypt = require("bcrypt");
const Response = require("../utilities/response");
const fs = require('fs');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey
});

$filePath = "/home/atiqul/docker-project/practice-deployment/public/uploads/attachments/sample.csv";

// get login page

async function getAllCampaign(req, res, next) {
  try {
    res.json("All campaign listing here....");
  } catch (err) {
    next(err);
  }
}

async function addCampaignRouter(req, res, next) {


  try {
    uploadFile($filePath);
    res.status(200).json({
      message: "User was added successfully!",
    });
  } catch (err) {
    next(err);
  }
}


const uploadFile = ($filePath) => {

  fs.readFile($filePath,'utf-8',  (err, data) => {
    if (err) throw err;
    const params = {
      Bucket: 'technokids-2021', // pass your bucket name
      Key: 'contacts.csv', // file will be saved as testBucket/contacts.csv
      Body : data
    };

    s3.upload(params, (s3Err, data) => {
      if (s3Err) throw s3Err;
      console.log(`File uploaded successfully at ${data.Location}`)
    });
  });
};



module.exports = {
  getAllCampaign,
  addCampaignRouter,
};
