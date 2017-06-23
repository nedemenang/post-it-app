'use strict';

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _AppActions = require('../actions/AppActions');

var _AppActions2 = _interopRequireDefault(_AppActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  registerNewUser: function registerNewUser(user) {
    console.log(user);
    _axios2.default.post('/users/signup', {
      email: user.email,
      password: user.password,
      userName: user.username
    }).then(function (response) {
      // console.log(response.data.message);
      _AppActions2.default.receiveSuccess(response.data.message);
    }).catch(function (error) {
      _AppActions2.default.receiveErrors(error.message);
    });
  },
  signinUser: function signinUser(user) {
    // console.log(user);
    _axios2.default.post('/users/signin', {
      email: user.email,
      password: user.password
    }).then(function (response) {
      //console.log(response);
      var authuser = {
        id: response.data.user.uid,
        email: user.email,
        profilePic: response.data.user.photoURL,
        isAuthenticated: true
      };
      _AppActions2.default.receiveSuccess(response.message);
      _AppActions2.default.receiveAuthenticatedUser(authuser);
      console.log(authuser);
    }).catch(function (error) {
      _AppActions2.default.receiveErrors(error);
      console.log(error);
      // console.log(user);
    });
  },
  signoutUser: function signoutUser(user) {
    _axios2.default.post('/users/signout', {
      userId: user.userId
    }).then(function (response) {
      _AppActions2.default.receiveSuccess(response.message);
    }).catch(function (error) {
      _AppActions2.default.receiveErrors(error.message);
    });
  },
  createNewGroup: function createNewGroup(group) {
    console.log(group);
    _axios2.default.post('/group', {
      groupName: group.groupname,
      dateCreated: group.datecreated
    }).then(function (response) {
      console.log('create group success');
      _AppActions2.default.receiveSuccess(response.message);
    }).catch(function (error) {
      console.log('create group error');
      _AppActions2.default.receiveErrors(error.message);
    });
  },
  addUserToGroup: function addUserToGroup(userGroup) {
    _axios2.default.post('/group/' + userGroup.groupId + '/user', {
      userId: userGroup.userId
    }).then(function (response) {
      _AppActions2.default.receiveSuccess(response.message);
      console.log(response);
    }).catch(function (error) {
      _AppActions2.default.receiveErrors(error.message);
      console.log(error);
    });
    // console.log('Adding user to group....');
  },
  postMessage: function postMessage(message) {
    _axios2.default.post('/group/' + message.groupId + '/addmessage', {
      groupId: message.groupId,
      messageBody: message.messagebody,
      postedBy: message.postedby,
      priority: message.priority
    }).then(function (response) {
      _AppActions2.default.receiveSuccess(response.message);
    }).catch(function (error) {
      _AppActions2.default.receiveErrors(error.message);
    });
  },
  getUserGroups: function getUserGroups() {
    console.log('getting group info...');
    _axios2.default.get('user/groups').then(function (response) {
      console.log(response);
      _AppActions2.default.receiveSuccess(response.message);
      _AppActions2.default.receiveUserGroups(response.data.groups);
    }).catch(function (error) {
      _AppActions2.default.receiveErrors(error.message);
    });
  },
  getGroupMessages: function getGroupMessages(group) {
    _axios2.default.get('group/messages', {
      params: {
        groupId: group.groupId
      }
    }).then(function (response) {
      _AppActions2.default.receiveSuccess(response.message);
      _AppActions2.default.receiveGroupMessages(response.messages);
    }).catch(function (error) {
      _AppActions2.default.receiveErrors(error.message);
    });
  },
  getUsersInGroups: function getUsersInGroups(group) {
    _axios2.default.get('group/users', {
      params: {
        groupId: group.groupId
      }
    }).then(function (response) {
      _AppActions2.default.receiveSuccess(response.message);
      _AppActions2.default.receiveUserInGroupResults(response.users);
    }).catch(function (error) {
      _AppActions2.default.receiveErrors(error.message);
    });
  },
  getUsersNotInGroups: function getUsersNotInGroups(group) {
    _axios2.default.get('group/notusers', {
      params: {
        groupId: group.groupId
      }
    }).then(function (response) {
      _AppActions2.default.receiveSuccess(response.message);
      _AppActions2.default.receiveUserNotInGroupResults(response.users);
    }).catch(function (error) {
      _AppActions2.default.receiveErrors(error.message);
    });
  }
};

// const AppActions = require('../actions/AppActions');