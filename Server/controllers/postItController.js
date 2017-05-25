import firebase from 'firebase';
import * as registerNewUser from '../Routes/registerNewUser';
import * as signInUser from '../Routes/signInUser';
import * as createNewGroup from '../Routes/createNewGroup';
import * as addUserToGroup from '../Routes/addUserToGroup';

const config = {
  apiKey: 'AIzaSyAUCocC9e7f3cohd-SiwJM8ZcCvL9tWO-A',
  authDomain: 'postit-e5e5e.firebaseapp.com',
  databaseURL: 'https://postit-e5e5e.firebaseio.com',
  projectId: 'postit-e5e5e',
  storageBucket: 'postit-e5e5e.appspot.com',
  messagingSenderId: '340486453500'
};
firebase.initializeApp(config);

module.exports = (app) => {
  app.post('/users/signup', (req, res) => {
    registerNewUser(req, res, firebase);
  });

  app.post('/users/signin', (req, res) => {
    signInUser(req, res, firebase);
  });
  app.post('/group', (req, res) => {
    createNewGroup(req, res, firebase);
  });

  app.post('/group/:groupId/user', (req, res) => {
    addUserToGroup(req, res, firebase);
  });
};
