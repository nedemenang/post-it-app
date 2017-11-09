'use strict';

var _users = require('../Controllers/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (app, firebase, io) {
  app.post('/users/signin', function (req, res) {
    _users2.default.signIn(req, res, firebase);
  });

  app.post('/users/passwordReset', function (req, res) {
    _users2.default.passwordReset(req, res, firebase);
  });

  app.post('/users/confirmPasswordReset', function (req, res) {
    _users2.default.confirmPasswordReset(req, res, firebase);
  });

  app.post('/users/googleSignin', function (req, res) {
    _users2.default.googleSignin(req, res, firebase);
  });

  app.post('/users/signout', function (req, res) {
    _users2.default.signOut(req, res, firebase);
  });

  app.post('/users/signup', function (req, res) {
    _users2.default.signUp(req, res, firebase);
  });

  app.post('/users/updateUserProfile', function (req, res) {
    _users2.default.updateUserProfile(req, res, firebase);
  });

  app.get('/user/:userId/group/:groupId/messages', function (req, res) {
    _users2.default.getGroupMessages(req, res, firebase, io);
  });

  app.get('/user/:userId/group/:groupId/quickMessages', function (req, res) {
    _users2.default.getGroupMessagesQuick(req, res, firebase);
  });

  app.get('/user/:userId/groups', function (req, res) {
    _users2.default.getGroups(req, res, firebase);
  });
};