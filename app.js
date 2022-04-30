const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const morgan = require("morgan");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

dotenv.config({ path: "./config/env/config.env" });
connectDB();

/* ------------------------------- MiddleWares ------------------------------ */

// app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname + '/Images')));
app.use("/auth", require("./routes/auth"));

/* -------------------------------------------------------------------------- */

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

/* ------------------------------ Server Setup ------------------------------ */
const PORT = process.env.PORT || 8000;

var Server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`);
});
/* -------------------------------------------------------------------------- */
