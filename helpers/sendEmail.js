const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (msg) => {
  try {
    const mail = { ...msg, from: "seregasmaga@gmail.com" };
    await sgMail.send(mail);
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmail;
