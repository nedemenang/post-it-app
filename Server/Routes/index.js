import * as firebase from 'firebase';
import * as dotenv from 'dotenv';
import userRoutes from './users';
import groupRoutes from './groups';

dotenv.config();

let config = {};
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'test') {
  config = {
    apiKey: process.env.APIKEYTEST,
    authDomain: process.env.AUTHDOMAINTEST,
    databaseURL: process.env.DATABASEURLTEST,
    projectId: process.env.PROJECTIDTEST,
    storageBucket: process.env.STORAGEBUCKETTEST,
    messagingSenderId: process.env.MESSAGESENDERIDTEST
  };
} else {
  config = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    databaseURL: process.env.DATABASEURL,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGESENDERID
  };
}

firebase.initializeApp(config);

module.exports = (app, io) => {
  // USER API ENDPOINTS
  userRoutes(app, firebase, io);
  // GROUP API ENDPOINTS
  groupRoutes(app, firebase, io);
};
