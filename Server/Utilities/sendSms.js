import Nexmo from 'nexmo';
import * as dotenv from 'dotenv';

dotenv.load();

const API_KEY = process.env.SMSAPIKEY;
const API_SECRET = process.env.SMSAPISECRET;
const nexmo = new Nexmo({
  apiKey: API_KEY,
  apiSecret: API_SECRET
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
