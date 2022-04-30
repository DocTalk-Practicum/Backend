const express = require("express");
const router = express.Router();
const upload = require('../middlewares/multer')
const authController = require("../controllers/auth");

router.post("/patientRegister", authController.patientRegister);
router.post("/doctorRegister",upload.array('files',2), authController.doctorRegister);
router.post("/login", authController.login);
router.get("/verifyDoctor/:id", authController.verifyDoctor);

module.exports = router;
