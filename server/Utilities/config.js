import firebase from 'firebase';
import dotenv from 'dotenv';

dotenv.load();

let config = {};
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
export default firebase;
