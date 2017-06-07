import firebase from 'firebase';
import registerNewUser from '../Routes/registerNewUser';
import signInUser from '../Routes/signInUser';
import createNewGroup from '../Routes/createNewGroup';
import addUserToGroup from '../Routes/addUserToGroup';
import signOutUser from '../Routes/signOutUser';
import postMessage from '../Routes/postMessage';

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

  app.post('/users/signout', (req, res) => {
    signOutUser(req, res, firebase);
  });

  app.post('/group', (req, res) => {
    createNewGroup(req, res, firebase);
  });

  app.post('/group/:groupId/user', (req, res) => {
    addUserToGroup(req, res, firebase);
  });

  app.post('/group/:groupId/addmessage', (req, res) => {
    postMessage(req, res, firebase);
  });
};
