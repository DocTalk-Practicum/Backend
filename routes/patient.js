const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");

router.post(
  "/uploadReport",
  upload.array("files", 1),
  authController.doctorRegister
);
