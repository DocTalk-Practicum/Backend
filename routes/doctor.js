const express = require("express");
const { getAllDoctors,getAppointments } = require("../controllers/doctor");
const { authPass } = require("../controllers/auth");
const router = express.Router();

router.get("/getAllDoctors",  getAllDoctors);
router.get("/getAppointments", authPass, getAppointments);


module.exports = router;