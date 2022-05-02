const express = require("express");
const { reportUpload,getAllReports } = require("../controllers/patient");
const { authPass } = require("../controllers/auth");
const router = express.Router();
const upload = require("../middlewares/multer");

router.post("/uploadReport", upload.array("files", 5),authPass, reportUpload);
router.get("/getAllReports",authPass, getAllReports);

module.exports = router;