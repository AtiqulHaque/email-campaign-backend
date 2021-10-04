const bcrypt = require("bcrypt");
const User = require("../models/Aupair");
const Response = require("../utilities/response");
// get login page

function home(req, res, next) {
  try {
    res.json("Its a new life... again again");
  } catch (err) {
    next(err);
  }
}

module.exports = {
  home,
};
