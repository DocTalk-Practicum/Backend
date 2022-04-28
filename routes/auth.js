const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

router.post("/patientregister", authController.patientRegister);
router.post("/doctorRegister", authController.doctorRegister);
router.post("/login", authController.login);

module.exports = router;
