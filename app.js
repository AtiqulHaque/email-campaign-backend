const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const campaignRouter = require("./routers/campaignRouter");
const { home } = require("./controllers/welcomeController");
const formidable = require("express-formidable");
require("dotenv").config();
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");
const app = express();

app.use(cors());

dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

app.get("/", home);

app.use("/campaign", campaignRouter);

app.use(formidable());

//Not found Hnadler
app.use(notFoundHandler);

// common error handler
app.use(errorHandler);

app.listen("3000", () => {
  console.log(`app listening to port 3000`);
});
