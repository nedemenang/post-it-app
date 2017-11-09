'use strict';

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _nodemailerSmtpTransport = require('nodemailer-smtp-transport');

var _nodemailerSmtpTransport2 = _interopRequireDefault(_nodemailerSmtpTransport);

var _dotenv = require('dotenv');

var dotenv = _interopRequireWildcard(_dotenv);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

dotenv.load();

module.exports = function (mailObject) {
  var transporter = _nodemailer2.default.createTransport((0, _nodemailerSmtpTransport2.default)({
    service: 'gmail',
    auth: {
      user: process.env.EMAILUSERNAME, // my mail
      pass: process.env.EMAILPASSWORD
    }
  }));
  var mailOptions = {
    from: '"Post It App" <notification@postit.com>',
    to: mailObject.To,
    subject: 'Message Posted',
    text: 'You have a new message in ' + mailObject.groupName,
    html: '<b>You have a new message in ' + mailObject.groupName + ' group.\n     Kindly log into the application to view.</b>'
  };

  transporter.sendMail(mailOptions, function (error) {
    if (error) {
      return false;
    }
    return true;
  });
};