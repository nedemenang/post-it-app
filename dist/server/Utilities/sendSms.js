'use strict';

var _nexmo = require('nexmo');

var _nexmo2 = _interopRequireDefault(_nexmo);

var _dotenv = require('dotenv');

var dotenv = _interopRequireWildcard(_dotenv);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

dotenv.load();

var nexmo = new _nexmo2.default({
  apiKey: process.env.SMSAPIKEY,
  apiSecret: process.env.SMSAPISECRET
});
module.exports = function (smsObject) {
  nexmo.message.sendSms('Post-It App', smsObject.phoneNo, 'A critical message has been posted in ' + smsObject.groupName, function (error, responseData) {
    if (error) {
      console.log(error);
    } else {
      console.log(responseData);
    }
  });
};