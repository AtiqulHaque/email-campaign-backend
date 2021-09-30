const bcrypt = require("bcrypt");
const Aupair = require("../models/Aupair");
const Response = require("../utilities/response");
// get login page

async function getAupair(req, res, next) {
  try {
    const AupairModel = new Aupair();

    res.json(
      Response.success(await AupairModel.getAllAupair(), Response.startTime)
    );
  } catch (err) {
    next(err);
  }
}

async function addAupair(req, res, next) {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  // save user or send error
  let params = {};
  try {
    if (req.files && req.files.length > 0) {
      params = {
        ...req.body,
        avatar: req.files[0].filename,
        password: hashedPassword,
        user: req.userId,
        address: {
          country: "Bangladesh",
          city: "Dhaka",
        },
      };
    } else {
      params = {
        ...req.body,
        password: hashedPassword,
        user: req.userId,
        address: {
          country: "Bangladesh",
          city: "Dhaka",
        },
        lang: [
          {
            name: "bangla",
            score: 3,
          },
          {
            name: "eng;ish",
            score: 2,
          },
        ],
      };
    }

    const AupairModel = new Aupair(params);

    await AupairModel.save();
    res.status(200).json({
      message: "User was added successfully!",
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json(
        Response.errorWithMessage("Cant not add user!", Response.startTime)
      );
  }
}

async function updateAupair(req, res, next) {
  // save user or send error
  try {
    const AupairModel = new Aupair();
    await AupairModel.updateAupair(req.params.id, {
      ...req.body,
    });
    res
      .status(200)
      .json(
        Response.successWithMessage(
          "User was updated successfully!",
          Response.startTime
        )
      );
  } catch (err) {
    res
      .status(500)
      .json(
        Response.errorWithMessage("Cant not update user!", Response.startTime)
      );
  }
}

async function deleteAupair(req, res, next) {
  try {
    const AupairModel = new Aupair();

    await AupairModel.deleteById(req.params.id);
    res
      .status(200)
      .json(
        Response.successWithMessage(
          "User was deleted successfully!",
          Response.startTime
        )
      );
  } catch (err) {
    res
      .status(500)
      .json(
        Response.errorWithMessage("Cant not delete user! ", Response.startTime)
      );
  }
}

module.exports = {
  getAupair,
  addAupair,
  updateAupair,
  deleteAupair,
};
