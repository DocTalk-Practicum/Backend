const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema(
	{
		firstName: {
			type: String,
			required: [true, 'A patient must have a first name']
		},
		lastName: {
			type: String,
			required: [true, 'A patient must have a last name']
		},
		email: {
			type: String,
			required: [true, 'A patient must have an email'],
			unique: true
		},
		password: {
			type: String,
			required: true
		},
		phn: {
			type: Number,
			required: [true, 'A patient must have a phone number']
		},
		age: {
			type: Number,
			required: [true, 'A patient must enter age']
		},
		gender: {
			type: String,
			required: [true, 'A patient must enter their gender']
		},
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
		clinicMap: String
	},
	{
		timestamps: true
	}
);

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
