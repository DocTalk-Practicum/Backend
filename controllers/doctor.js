const Doctor = require("../models/doctor");
const Report = require("../models/report");

const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find({verified: true});
        res.status(200).json({
            status: "success",
            data: doctors
        })
    }catch(error){
        res.status(500).json({
            status: "Failure",
            message: error.message
        })
    }
}

const getAppointments = async (req, res) => {
    try {
        const appointments = await Report.find({docId: req.user.id}).populate("patientId");
        if(appointments){
            res.status(200).json({
                status: "success",
                data: appointments
            })
        }else{
            res.status(404).json({
                status: "error",
                message: "No Appointments Found"
            })
        }
    }catch(error){
        res.status(500).json({
            status: "Failure",
            message: error.message
        })
    }
}

module.exports = {
    getAllDoctors,
    getAppointments
}