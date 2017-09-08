import Nexmo from 'nexmo';
import * as dotenv from 'dotenv';

dotenv.load();

const nexmo = new Nexmo({
  apiKey: process.env.SMSAPIKEY,
  apiSecret: process.env.SMSAPISECRET
});
module.exports = (smsObject) => {
  nexmo.message.sendSms(
              'Post-It App', smsObject.phoneNo,
              `A critical message has been posted in ${smsObject.groupName}`,
              (error, responseData) => {
                if (error) {
                  console.log(error);
                } else {
                  console.log(responseData);
                }
              });
};
