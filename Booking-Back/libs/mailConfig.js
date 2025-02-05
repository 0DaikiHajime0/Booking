const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'lab.recursosvirt@continental.edu.pe',
    pass: 'vgxh bgvr saac eviy'
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Error en la conexión SMTP:", error);
  } else {
    console.log("Conexión SMTP exitosa, listo para enviar correos.");
  }
});

module.exports = transporter;
