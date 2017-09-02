import * as firebase from 'firebase';
import * as dotenv from 'dotenv';
import userRoutes from './users';
import groupRoutes from './groups';

dotenv.config();
const config = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  databaseURL: process.env.DATABASEURL,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGESENDERID
};
firebase.initializeApp(config);

module.exports = (app, io) => {
  // USER API ENDPOINTS
  userRoutes(app, firebase, io);
  // GROUP API ENDPOINTS
  groupRoutes(app, firebase, io);
};
