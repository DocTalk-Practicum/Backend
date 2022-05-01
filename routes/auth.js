const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

router.post("/patientRegister", authController.patientRegister);
router.post("/doctorRegister", authController.doctorRegister);
router.post("/login", authController.login);

module.exports = router;
