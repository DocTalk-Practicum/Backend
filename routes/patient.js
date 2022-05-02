const express = require("express");
const { reportUpload } = require("../controllers/patient");
const router = express.Router();
const upload = require("../middlewares/multer");

router.post("/uploadReport", upload.array("files", 1), reportUpload);

module.exports = router;