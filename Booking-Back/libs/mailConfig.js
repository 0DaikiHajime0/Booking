const nodemailer = require('nodemailer');

const transporterOptions  = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
      user: 'lab.recursosvirt@continental.edu.pe',
      pass: 'gppq zozh qokj vtzv'
  }
};

const transporter = nodemailer.createTransport(transporterOptions);

module.exports = transporter;
