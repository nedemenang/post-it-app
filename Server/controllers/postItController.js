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
import getUsersNotInGroups from '../Routes/getUsersNotInGroups';
import signInGoogleUser from '../Routes/googleSignin';
import passwordReset from '../Routes/passwordReset';
import confirmPasswordReset from '../Routes/passwordResetConfirm';
import updateUserProfile from '../Routes/updateUserProfile';

const config = {
  apiKey: 'AIzaSyAUCocC9e7f3cohd-SiwJM8ZcCvL9tWO-A',
  authDomain: 'postit-e5e5e.firebaseapp.com',
  databaseURL: 'https://postit-e5e5e.firebaseio.com',
  projectId: 'postit-e5e5e',
  storageBucket: 'postit-e5e5e.appspot.com',
  messagingSenderId: '340486453500'
};
firebase.initializeApp(config);

module.exports = (app, io) => {
  app.post('/users/signup', (req, res) => {
    registerNewUser(req, res, firebase, io);
  });

  app.post('/users/updateUserProfile', (req, res) => {
    updateUserProfile(req, res, firebase);
  });

  app.post('/users/signin', (req, res) => {
    signInUser(req, res, firebase);
  });

  app.post('/users/passwordReset', (req, res) => {
    passwordReset(req, res, firebase);
  });

  app.post('/users/confirmPasswordReset', (req, res) => {
    confirmPasswordReset(req, res, firebase);
  });

  app.post('/users/googleSignin', (req, res) => {
    signInGoogleUser(req, res, firebase, io);
  });

  app.post('/users/signout', (req, res) => {
    signOutUser(req, res, firebase);
  });

  app.post('/group', (req, res) => {
    //console.log('create new group...');
    createNewGroup(req, res, firebase, io);
  });

  app.post('/group/:groupId/user', (req, res) => {
    addUserToGroup(req, res, firebase, io);
  });

  app.post('/group/:groupId/message', (req, res) => {
    postMessage(req, res, firebase, io);
  });

  app.get('/user/groups', (req, res) => {
    console.log('getting user group from database');
    getUserGroups(req, res, firebase);
  });

  app.get('/group/:groupId/messages', (req, res) => {
    getGroupMessages(req, res, firebase);
  });

  app.get('/group/users', (req, res) => {
    getUsersInGroups(req, res, firebase);
  });

  app.get('/group/:groupId/notusers', (req, res) => {
    getUsersNotInGroups(req, res, firebase);
  });
};
