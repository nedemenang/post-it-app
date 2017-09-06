import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

module.exports = (mailObject) => {
  const transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
      user: 'nnamso.edemenang@gmail.com', // my mail
      pass: ''
    }
  }));
  const mailOptions = {
    from: '"Post It App" <notification@postit.com>',
    to: mailObject.To,
    subject: 'Message Posted',
    text: `You have a new message in ${mailObject.groupName}`,
    html: `<b>You have a new message in ${mailObject.groupName} group. Kindly log into the application to view.</b>`
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error);
    }
  });
};
