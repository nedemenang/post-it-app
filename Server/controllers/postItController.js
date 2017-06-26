import * as firebase from 'firebase';
import registerNewUser from '../Routes/registerNewUser';
import signInUser from '../Routes/signInUser';
import createNewGroup from '../Routes/createNewGroup';
import addUserToGroup from '../Routes/addUserToGroup';
import signOutUser from '../Routes/signOutUser';
import postMessage from '../Routes/postMessage';
import getUserGroups from '../Routes/getUserGroups';
import getGroupMessages from '../Routes/getGroupMessages';
import getUsersInGroups from '../Routes/getUsersInGroups';
// import getUsersNotInGroups from '../Routes/getUsersNotInGroups';
// import signInUserGoogle from '../Routes/SignInUserGoogle';

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

  app.post('/group/:groupId/message', (req, res) => {
    postMessage(req, res, firebase);
  });

  app.get('/user/groups', (req, res) => {
    getUserGroups(req, res, firebase);
  });

  app.get('/group/:groupId/messages', (req, res) => {
    getGroupMessages(req, res, firebase);
  });

  app.get('/group/users', (req, res) => {
    getUsersInGroups(req, res, firebase);
  });

 // app.get('/group/notusers', (req, res) => {
  //  getUsersNotInGroups(req, res, firebase);
 // });
};
