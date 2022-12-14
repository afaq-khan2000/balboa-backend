const express = require("express");
let router = express.Router();
let { Mail } = require("../models/mail");

const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.get("/", async (req, res) => {
  const mails = await Mail.find().sort({ date: -1 });
  res.send(mails);
});

router.post("/send", async (req, res) => {
  const { firstName, lastName, email, subject, message, phone } = req.body;

  // const emailData = {
  //   from: "kafaq885@gmail.com",
  //   to: "kafaq885@gmail.com",
  //   subject: subject,
  //   html: `
  //                 ${message}

  //               `,
  // };

  // sgMail
  //   .send(emailData)
  //   .then(async (sent) => {
  const mail = new Mail({
    firstName,
    lastName,
    email,
    subject,
    message,
    phone,
  });
  await mail.save();
  return res.status(200).send(`Email has been sent`);
  // })
  // .catch((err) => {
  //   return res.status(400).send("email sending error");
  // });
});

module.exports = router;
