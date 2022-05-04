const router = require("express").Router();
let Registered = require("../models/registered.model");
const nodemailer = require("nodemailer");
var credentials = require("./credentials.js");
Registered = Registered.Registered
const accountSid = credentials.sid;
const authToken = credentials.token;
const mid = credentials.messagingServiceSid;
const client = require("twilio")(accountSid, authToken);
let appointmentDetails;
let appointmentDetails2;

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: credentials.email,
    pass: credentials.password,
  },
  secure: true,
});

router.route("/all").get((req, res) => {
  Registered.find({}).then((data) => {
    res.send(data);
  });
});

router.route("/add").post((req, res) => {
  let datetoday = new Date();
  if (req.body.age > 59) {
    appointmentDetails =
      "Date and Time: " +
      req.body.appointmentDateandTime.replace("T", " ") +
      "<br/><p>*Timings in 24H format</p>";
    appointmentDetails2 =
      "Date and Time: " +
      req.body.appointmentDateandTime.replace("T", " ") +
      "(*Timings in 24H format)";
  } else {
    appointmentDetails =
      "<b>Date: </b>" +
      req.body.appointmentDate +
      "<br/><b>Slot: </b>" +
      req.body.slot.start +
      "-" +
      req.body.slot.end +
      "<br/><p>*Timings in 24H format</p>";
    appointmentDetails2 =
      " Date: " +
      req.body.appointmentDate +
      " Slot: " +
      req.body.slot.start +
      "-" +
      req.body.slot.end +
      "(*Timings in 24H format)";
  }
  const registered = new Registered({
    fname: req.body.fname,
    lname: req.body.lname,
    gender: req.body.gender,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    phone: req.body.phone,
    email: req.body.email,
    shospital: req.body.shospital,
    dob: req.body.dob,
    slot: req.body.slot,
    appointmentDateandTime: req.body.appointmentDateandTime,
    appointmentDate: req.body.appointmentDate,
    age: req.body.age,
    date: datetoday.toString(),
  });
  registered
    .save()
    .then((rec) => {
      client.messages
        .create({
          messagingServiceSid: mid,
          body:
            "Vaccine booked. Your Reference ID: " +
            rec._id +
            appointmentDetails2,
          to: "+91"+req.body.phone,
        })
        .then((message) => console.log(message.sid))
        .done();
      const mailData = {
        from: "VaxTrail" + credentials.email,
        to: req.body.email,
        subject: "Vaccine Confimation",
        text: "text",
        html:
          "<br>Vaccine Booked! </br><br>Thank You for registering for the Vaccination Program.<br>Your Booking ID: " +
          "<b>" +
          rec._id +
          "</b>" +
          "<br/>Keep this mail for future reference.<br><br>Stay safe and healthy!<br/><br/><b>Booking Details:</b><br/>" +
          appointmentDetails,
      };

      transporter.sendMail(mailData, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log("Mail Sent");
      });
      res.send(rec._id);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/status/:id").all((req, res) => {
  Registered.findById(req.params.id)
    .then((rec) => {
      console.log(rec);
      console.log(typeof rec);
      res.send(rec);
    })
    .catch((err) => {
      console.log(err);
      res.send("Not Found");
    });
});

router.route("/delete/:id").all((req, res) => {
  Registered.findByIdAndDelete(req.params.id)
    .then(() => {
      res.json("Appointment Cancelled.");
      const mailData = {
        from: "VaxTrail" + credentials.email,
        to: req.body.email,
        subject: "Appointment Cancellation",
        text: "text",
        html:
          "<br>Vaccination Appointment Cancelled<br><br>Your appointment with Booking ID: " +
          "<b>" +
          req.params.id +
          "</b>" +
          " has been cancelled. You can register your appointment again anytime.<br><br>Stay safe and healthy!<br/><br/>Thank You!",
      };
      client.messages
        .create({
          messagingServiceSid: credentials.messagingServiceSid,
          body:
            "Vaccination Appointment Cancelled. Your appointment with Booking ID: " +
            req.params.id +
            " has been cancelled.",
          to: "+91"+req.body.phone,
        })
        .then((message) => console.log(message.sid))
        .done();
      transporter.sendMail(mailData, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log("Mail Sent");
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
module.exports = router;
