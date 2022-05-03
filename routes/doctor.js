const express = require("express");
const { getAllDoctors,getAppointments,getReferedAppointments,referDoctor,uploadPrescription } = require("../controllers/doctor");
const { authPass } = require("../controllers/auth");
const router = express.Router();
const upload = require("../middlewares/multer");

router.get("/getAllDoctors",  getAllDoctors);
router.get("/getAppointments", authPass, getAppointments);
router.get("/getReferedAppointments", authPass, getReferedAppointments);
router.post("/referDoctor", authPass, referDoctor);
router.post("/uploadPrescription", upload.array("files", 5),authPass, uploadPrescription);


module.exports = router;