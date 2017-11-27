import Users from '../controllers/Users';
import Validator from '../utilities/Validator';

module.exports = (app, firebase, io) => {
  app.post('/users/signin', Validator, (req, res) => {
    Users.signIn(req, res, firebase);
  });

  app.post('/users/passwordReset', Validator, (req, res) => {
    Users.resetPassword(req, res, firebase);
  });

  app.post('/users/confirmPasswordReset', Validator, (req, res) => {
    Users.confirmPasswordReset(req, res, firebase);
  });

  app.post('/users/googleSignin', Validator, (req, res) => {
    Users.googleSignin(req, res, firebase);
  });

  app.post('/users/signout', (req, res) => {
    Users.signOut(req, res, firebase);
  });

  app.post('/users/signup', Validator, (req, res) => {
    Users.signUp(req, res, firebase);
  });

  app.post('/users/updateUserProfile', (req, res) => {
    Users.updateUserProfile(req, res, firebase);
  });

  app.get('/user/:userId/group/:groupId/messages', Validator, (req, res) => {
    Users.getUserGroupMessagesWithEventListener(req, res, firebase, io);
  });

  app.get('/user/:userId/group/:groupId/quickMessages',
  Validator, (req, res) => {
    Users.getUserGroupMessagesWithoutEventListener(req, res, firebase);
  });

  app.get('/user/:userId/groups', Validator, (req, res) => {
    Users.getGroups(req, res, firebase);
  });
};
