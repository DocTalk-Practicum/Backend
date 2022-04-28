const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phn: String,
  age: Number,
  gender: String,
  pic: String,
  description: String,
  validation: String,
  speciality: String,
  clinicName: String,
  clinicAddress: String,
  clinicMap: String,
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
