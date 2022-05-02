const Patient = require("../models/user");
const Doctor = require("../models/doctor");
const Report = require("../models/report");

const reportUpload = async (req, res) => {
  try {
    const { date, time, docId, reasonForVisit } = req.body;
    const doctor = await Doctor.findById(docId);
    if (!doctor) {
      return res.status(404).json({
        status: "error",
        message: "Doctor Doesnt Exist",
      });
    } else {
      let report = new Report({
        date,
        time,
        docId,
        reasonForVisit,
        medicalFiles: `/images/${req.files[0].filename.replace(/ /g, "_")}`,
      });

      await report.save();
      res.status(200).json({
        status: "success",
        message: "Successfully uploaded Report",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Failure",
      message: error,
    });
  }
};

module.exports = {
  doctorRegister,
};
