const bcrypt = require("bcrypt");
const User = require("../models/User");
const Response = require("../utilities/response");
const jwt = require("jsonwebtoken");
// get login page

async function signUp(req, res, next) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      password: hashedPassword,
    });
    await newUser.save();
    res
      .status(200)
      .json(
        Response.successWithMessage(
          "Signup was successful!",
          Response.startTime
        )
      );
  } catch {
    res
      .status(500)
      .json(Response.successWithError("Signup failed!", Response.startTime));
  }
}

async function login(req, res, next) {
  try {
    const user = await User.find({ username: req.body.username });
    if (user && user.length > 0) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user[0].password
      );

      if (isValidPassword) {
        // generate token
        const token = jwt.sign(
          {
            username: user[0].username,
            userId: user[0]._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );

        res
          .status(200)
          .json(Response.success({ access_token: token }, Response.startTime));
      } else {
        res
          .status(401)
          .json(
            Response.successWithError(
              "Authetication failed!",
              Response.startTime
            )
          );
      }
    } else {
      res
        .status(401)
        .json(
          Response.successWithError("Authetication failed!", Response.startTime)
        );
    }
  } catch {
    res
      .status(401)
      .json(
        Response.successWithError("Authetication failed!", Response.startTime)
      );
  }
}

module.exports = {
  signUp,
  login,
};
