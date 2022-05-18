const express = require("express");
const {
  getAllDoctors,
  getAppointments,
  getReferedAppointments,
  referDoctor,
  uploadPrescription,
  getDoctorById,
} = require("../controllers/doctor");
const { authPass } = require("../controllers/auth");
const router = express.Router();
const upload = require("../middlewares/multer");
const Report = require("../models/report");

router.get("/getAllDoctors", getAllDoctors);
router.get("/getAppointments", authPass, getAppointments);
router.get("/getReferedAppointments", authPass, getReferedAppointments);
router.post("/referDoctor", authPass, referDoctor);
router.post(
  "/uploadPrescription",
  upload.array("files", 5),
  authPass,
  uploadPrescription
);
// router.get("/getDoctorById/:id", authPass, getDoctorById);

router.post("/getLink", async (req, res) => {
  const { link, id } = req.body;
  try {
    const report = await Report.findOne({ DoctorId: id });
    if (!report) {
      return res.status(404).send("NO Teacher Found");
    }
    report.meetLink = link;
    report.save();
    res.status(200).json({
      msg: "Success",
      data: link,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
