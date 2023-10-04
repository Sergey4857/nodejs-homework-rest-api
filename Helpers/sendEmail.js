const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KAY } = process.env;

sgMail.setApiKey(SENDGRID_API_KAY);

const data = {
  to: "mokisak519@gekme.com",
  subject: "Test mail",
  html: "<p>Our test mail</p>",
};

const sendEmail = async (data) => {
  const email = { ...data, from: "yasak.sergey@gmail.com" };
  await sgMail
    .send(email)
    .then(() => console.log("Email send sucess"))
    .catch((error) => console.log(error));
};
module.exports = sendEmail;
