const Patient = require("../models/user");
const Doctor = require("../models/doctor");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const patientRegister = async (req, res, next) => {
  try {
    const patient = await Patient.findOne({ email: req.body.email });
    if (patient) {
      return res.status(400).json({
        status: "error",
        message: "Email already exists",
      });
    } else {
      bcrypt.hash(req.body.password, 10, async function (err, hashedPassword) {
        if (err) {
          res.status(400).json({
            status: "error",
            message: "Failed",
          });
        }

        let patient = new Patient({
          name: req.body.name,
          email: req.body.email,
          phn: req.body.phn,
          photo: req.body.photo,
          password: hashedPassword,
        });

        await patient.save();
      });
      res.status(200).json({
        status: "success",
        message: "Successfully registered Patient ",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Failure",
      message: error,
    });
  }
};
const doctorRegister = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ email: req.body.email });
    if (doctor) {
      return res.status(400).json({
        status: "error",
        message: "Email already exists",
      });
    } else {
      bcrypt.hash(req.body.password, 10, async function (err, hashedPassword) {
        if (err) {
          res.status(400).json({
            status: "error",
            message: "Failed",
          });
        }

        let doctor = new Doctor({
          name: req.body.name,
          email: req.body.email,
          phn: req.body.phn,
          photo: req.body.photo,
          password: hashedPassword,
        });

        await doctor.save();
      });
      res.status(200).json({
        status: "success",
        message: "Successfully registered Doctor ",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Failure",
      message: error,
    });
  }
};

const login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  Patient.findOne({ email: email }).then(async (patient) => {
    if (patient) {
      bcrypt.compare(password, patient.password, async (err, result) => {
        if (err) {
          res.status(400).json({
            status: "error",
            message: "Some error occured",
          });
        }
        if (result) {
          var token = jwt.sign({ id: patient._id }, process.env.JWT_SECRET, {
            expiresIn: "2d",
          });

          res.status(200).json({
            status: "success",
            message: "Logged In successfully",
            token,
          });
        } else {
          res.status(400).json({
            status: "error",
            message: "Credentials Not Correct",
          });
        }
      });
    } else {
      const doctor = await Doctor.findOne({ email });
      if (!doctor) {
        return res.status(404).json({
          message: "Email Id is Invalid",
        });
      }
      bcrypt.compare(password, doctor.password, (err, result) => {
        if (err) {
          res.status(400).json({
            status: "error",
            message: "Some error occured",
          });
        }
        if (result) {
          var token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, {
            expiresIn: "2h",
          });
          res.status(200).json({
            status: "success",
            message: "Logged In successfully as A doctor",
            token,
          });
        } else {
          res.status(400).json({
            status: "error",
            message: "Credentials Not Correct",
          });
        }
      });
    }
  });
};

/* ----------------------- DashBoard Protection Route ----------------------- */

const authPass = async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // console.log("Inside If of auth Pass");
    // console.log(req.headers.authorization);
    // console.log(req.headers.authorization.startsWith("Bearer"));

    token = req.headers.authorization.split(" ")[1];
    // console.log(token);
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res.status(400).json({
      message: "You aren't Logged In",
    });
  }

  // 2) Verification token
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  // console.log("This is decoded", decoded);

  // 3) Check if user still exists
  const currentUser = await Patient.findById(decoded.id);

  if (!currentUser) {
    const currentDoctor = await Doctor.findById(decoded.id);
    if (currentDoctor) {
      req.user = currentDoctor;
      res.locals.user = currentDoctor;
      return next();
    } else {
      return res.status(404).json({
        message: "You aren't Logged In",
      });
    }
  }

  // 4) Check if user changed password after the token was issued

  // GRANT ACCESS TO PROTECTED ROUTE

  req.user = currentUser;
  // console.log("This is req.user from middleware", req.user);
  res.locals.user = currentUser;
  console.log("Successfully Passed Middleware");
  next();
};

module.exports = {
  patientRegister,
  doctorRegister,
  login,
  authPass,
};
