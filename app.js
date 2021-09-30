const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const aupairRouter = require("./routers/aupairRouter");
const hostFamilyRouter = require("./routers/hostFamilyRouter");
const authRouter = require("./routers/authRouter");
const { home } = require("./controllers/welcomeController");

const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");

const app = express();

app.use(cors());

dotenv.config();

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connection successful!"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

app.get("/", home);

app.use("/user", authRouter);

app.use("/aupair", aupairRouter);

app.use("/host-family", hostFamilyRouter);

//Not found Hnadler
app.use(notFoundHandler);

// common error handler
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`app listening to port ${process.env.PORT}`);
});
