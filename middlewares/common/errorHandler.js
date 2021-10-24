const createError = require("http-errors");

// 404 not found handler
function notFoundHandler(req, res, next) {
  next(createError(404, "Your requested content was not found!"));
}

// default error handler
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    next("There was an error!");
  } else {
    if (process.env.NODE_ENV === "development") {
      console.error(err);
      res.error = {
        status: "error",
        message: err.message,
      };
    } else {
      console.log(err.message);
      res.error = { status: "error", message: "Internal Server Error" };
    }

    res.status(err.status || 500);
    res.json(res.error);
  }
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
