const mongoose = require("mongoose");

const hostFamilySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    address: {
      country: String,
      city: String,
    },
    lang: [
      {
        name: String,
        score: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = hostFamilySchema;
