import userController from '../controllers/users';
import Validator from '../utilities/Validator';

module.exports = (app, firebase, io) => {
  app.post('/users/signin', Validator, (req, res) => {
    userController.signIn(req, res, firebase);
  });

  app.post('/users/passwordReset', Validator, (req, res) => {
    userController.passwordReset(req, res, firebase);
  });

  app.post('/users/confirmPasswordReset', (req, res) => {
    userController.confirmPasswordReset(req, res, firebase);
  });

  app.post('/users/googleSignin', (req, res) => {
    userController.googleSignin(req, res, firebase);
  });

  app.post('/users/signout', (req, res) => {
    userController.signOut(req, res, firebase);
  });

  app.post('/users/signup', Validator, (req, res) => {
    userController.signUp(req, res, firebase);
  });

  app.post('/users/updateUserProfile', (req, res) => {
    userController.updateUserProfile(req, res, firebase);
  });

  app.get('/user/:userId/group/:groupId/messages', (req, res) => {
    userController.getGroupMessages(req, res, firebase, io);
  });

  app.get('/user/:userId/group/:groupId/quickMessages', (req, res) => {
    userController.getGroupMessagesQuick(req, res, firebase);
  });

  app.get('/user/:userId/groups', (req, res) => {
    userController.getGroups(req, res, firebase);
  });
};
