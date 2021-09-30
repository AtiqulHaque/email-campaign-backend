const mongoose = require("mongoose");
const HostFamilySchema = require("./Schemas/HostFamily");

HostFamilySchema.methods = {
  getAllFamily: function () {
    return mongoose.model("Aupair").find().populate("user");
  },
  updateFamily: (userId, data) => {
    return mongoose.model("Aupair").updateOne(
      {
        _id: userId,
      },
      {
        $set: data,
      }
    );
  },
  deleteById: (userId) => {
    return mongoose.model("Aupair").deleteOne(
      {
        _id: userId,
      },
      {
        $set: data,
      }
    );
  },
};

const HostFamily = mongoose.model("HostFamily", HostFamilySchema);

module.exports = HostFamily;
