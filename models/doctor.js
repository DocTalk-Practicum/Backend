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
  documents: String,
  description: String,
  validation: {
    type: Boolean,
    default: false
  },
  speciality: String,
  clinicName: String,
  clinicAddress: String,
  clinicMap: String,
},{
  timestamps: true
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
