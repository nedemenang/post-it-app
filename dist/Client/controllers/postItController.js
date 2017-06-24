'use strict';

var _firebase = require('firebase');

var firebase = _interopRequireWildcard(_firebase);

var _registerNewUser = require('../Routes/registerNewUser');

var _registerNewUser2 = _interopRequireDefault(_registerNewUser);

var _signInUser = require('../Routes/signInUser');

var _signInUser2 = _interopRequireDefault(_signInUser);

var _createNewGroup = require('../Routes/createNewGroup');

var _createNewGroup2 = _interopRequireDefault(_createNewGroup);

var _addUserToGroup = require('../Routes/addUserToGroup');

var _addUserToGroup2 = _interopRequireDefault(_addUserToGroup);

var _signOutUser = require('../Routes/signOutUser');

var _signOutUser2 = _interopRequireDefault(_signOutUser);

var _postMessage = require('../Routes/postMessage');

var _postMessage2 = _interopRequireDefault(_postMessage);

var _getUserGroups = require('../Routes/getUserGroups');

var _getUserGroups2 = _interopRequireDefault(_getUserGroups);

var _getGroupMessages = require('../Routes/getGroupMessages');

var _getGroupMessages2 = _interopRequireDefault(_getGroupMessages);

var _getUsersInGroups = require('../Routes/getUsersInGroups');

var _getUsersInGroups2 = _interopRequireDefault(_getUsersInGroups);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// import getUsersNotInGroups from '../Routes/getUsersNotInGroups';
// import signInUserGoogle from '../Routes/SignInUserGoogle';

var config = {
  apiKey: 'AIzaSyAUCocC9e7f3cohd-SiwJM8ZcCvL9tWO-A',
  authDomain: 'postit-e5e5e.firebaseapp.com',
  databaseURL: 'https://postit-e5e5e.firebaseio.com',
  projectId: 'postit-e5e5e',
  storageBucket: 'postit-e5e5e.appspot.com',
  messagingSenderId: '340486453500'
};
firebase.initializeApp(config);

module.exports = function (app) {
  app.post('/users/signup', function (req, res) {
    (0, _registerNewUser2.default)(req, res, firebase);
  });

  app.post('/users/signin', function (req, res) {
    (0, _signInUser2.default)(req, res, firebase);
  });

  app.post('/users/signout', function (req, res) {
    (0, _signOutUser2.default)(req, res, firebase);
  });

  app.post('/group', function (req, res) {
    (0, _createNewGroup2.default)(req, res, firebase);
  });

  app.post('/group/:groupId/user', function (req, res) {
    (0, _addUserToGroup2.default)(req, res, firebase);
  });

  app.post('/group/:groupId/message', function (req, res) {
    (0, _postMessage2.default)(req, res, firebase);
  });

  app.get('/user/groups', function (req, res) {
    (0, _getUserGroups2.default)(req, res, firebase);
  });

  app.get('/group/messages', function (req, res) {
    (0, _getGroupMessages2.default)(req, res, firebase);
  });

  app.get('/group/users', function (req, res) {
    (0, _getUsersInGroups2.default)(req, res, firebase);
  });

  // app.get('/group/notusers', (req, res) => {
  //  getUsersNotInGroups(req, res, firebase);
  // });
};