import Nexmo from 'nexmo';

const API_KEY = 'fa43188a';
const API_SECRET = '6eec78df11a6d609';
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
