import userController from '../Controllers/users';

module.exports = (app, firebase, io) => {
  app.post('/users/signin', (res, req) => {
    userController.signIn(res, req, firebase);
  });

  app.post('/users/passwordReset', (res, req) => {
    userController.passwordReset(res, req, firebase);
  });

  app.post('/users/confirmPasswordReset', (res, req) => {
    userController.confirmPasswordReset(res, req, firebase);
  });

  app.post('/users/googleSignin', (res, req) => {
    userController.googleSignin(res, req, firebase);
  });

  app.post('/users/signout', (res, req) => {
    userController.signOut(res, req, firebase);
  });

  app.post('/users/signup', (res, req) => {
    userController.signUp(res, req, firebase);
  });

  app.post('/users/updateUserProfile', (res, req) => {
    userController.updateUserProfile(req, res, firebase);
  });

  app.get('/user/:userId/group/:groupId/messages', (res, req) => {
    userController.groupMessages(res, req, firebase, io);
  });

  app.get('/user/:userId/group/:groupId/quickMessages', (res, req) => {
    userController.groupMessagesQuick(res, req, firebase);
  });

  app.get('/user/:userId/groups', (res, req) => {
    userController.groups(res, req, firebase);
  });
};
