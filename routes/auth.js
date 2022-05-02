const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");
const {patientRegister,verifyDoctor,doctorRegister,login} = require("../controllers/auth");

router.post("/patientRegister", patientRegister);
router.post(
  "/doctorRegister",
  upload.array("files", 2),
  doctorRegister
);
router.post("/login", login);
router.get("/verifyDoctor/:id", verifyDoctor);

module.exports = router;
