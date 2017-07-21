import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

// var transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 587,
//   secure: false, // secure:true for port 465, secure:false for port 587
//   auth: {
//     user: 'xxxx@gmail.com',
//     pass: 'xxxx'
//   }
// });

module.exports = (mailObject) => {
  const transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
      user: 'nnamso.edemenang@gmail.com', // my mail
      pass: 'Sup3rP@ssword'
    }
  }));
  // const transporter = nodemailer.createTransport({
  //   host: 'smtp.live.com',
  //   port: 587,
  //   secure: false, // secure:true for port 465, secure:false for port 587
  //   auth: {
  //     user: 'postitapplication@hotmail.com',
  //     pass: 'Sup3rP@ssword'
  //   }
  // });
// setup email data with unicode symbols
  // console.log(mailObject.To);
  const mailOptions = {
    from: '"Post It App" <notification@postit.com>',
    to: mailObject.To,
    subject: 'Message Posted',
    text: `You have a new message in ${mailObject.groupName}`,
    html: `<b>You have a new message in ${mailObject.groupName} ?</b>`
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error);
    }
  });
};
