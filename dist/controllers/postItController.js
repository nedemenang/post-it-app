'use strict';

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = {
  apiKey: 'AIzaSyAUCocC9e7f3cohd-SiwJM8ZcCvL9tWO-A',
  authDomain: 'postit-e5e5e.firebaseapp.com',
  databaseURL: 'https://postit-e5e5e.firebaseio.com',
  projectId: 'postit-e5e5e',
  storageBucket: 'postit-e5e5e.appspot.com',
  messagingSenderId: '340486453500'
};
_firebase2.default.initializeApp(config);

module.exports = function (app) {
  app.post('/users/signup', function (req, res) {
    (0, _registerNewUser2.default)(req, res, _firebase2.default);
  });

  app.post('/users/signin', function (req, res) {
    (0, _signInUser2.default)(req, res, _firebase2.default);
  });

  app.post('/users/signout', function (req, res) {
    (0, _signOutUser2.default)(req, res, _firebase2.default);
  });

  app.post('/group', function (req, res) {
    (0, _createNewGroup2.default)(req, res, _firebase2.default);
  });

  app.post('/group/:groupId/user', function (req, res) {
    (0, _addUserToGroup2.default)(req, res, _firebase2.default);
  });
};