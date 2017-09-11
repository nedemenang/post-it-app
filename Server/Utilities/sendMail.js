import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import * as dotenv from 'dotenv';

dotenv.load();

module.exports = (mailObject) => {
  const transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAILUSERNAME, // my mail
      pass: process.env.EMAILPASSWORD
    }
  }));
  const mailOptions = {
    from: '"Post It App" <notification@postit.com>',
    to: mailObject.To,
    subject: 'Message Posted',
    text: `You have a new message in ${mailObject.groupName}`,
    html: `<b>You have a new message in ${mailObject.groupName} group.
     Kindly log into the application to view.</b>`
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error);
    }
  });
};
