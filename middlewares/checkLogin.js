const Response = require("../utilities/response");
const jwt = require("jsonwebtoken");

const checkLogin = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { username, userId } = decoded;
    req.username = username;
    req.userId = userId;
    next();
  } catch (err) {
    res
      .status(401)
      .json(
        Response.errorWithMessage("Authentication failure!", Response.startTime)
      );
  }
};

module.exports = checkLogin;
