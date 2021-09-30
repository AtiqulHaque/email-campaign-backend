const mongoose = require("mongoose");
const AupairSchema = require("./Schemas/Aupair");

// const Aupair = {};

// Aupair.GetAll = async () => {
//   const data = await AupairModel.find();
//   return data;
// };

// Aupair.InsertData = async (params) => {
//   const newUser = new AupairModel(params);
//   await newUser.save();
// };

// Aupair.UpdateData = async (id, params) => {
//   await AupairModel.updateOne(
//     {
//       _id: id,
//     },
//     {
//       $set: params,
//     }
//   );
// };

// Aupair.deleteById = async (id) => {
//   await AupairModel.deleteOne({
//     _id: id,
//   });
// };

AupairSchema.methods = {
  getAllAupair: function () {
    return mongoose.model("Aupair").find().populate("user");
  },
  updateAupair: (userId, data) => {
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

const Aupair = mongoose.model("Aupair", AupairSchema);

module.exports = Aupair;
