'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AppDispatcher = require('../dispatcher/AppDispatcher');

var _AppDispatcher2 = _interopRequireDefault(_AppDispatcher);

var _AppConstants = require('../constants/AppConstants');

var _AppConstants2 = _interopRequireDefault(_AppConstants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AppActions = {
  // console.log('Logging user....');
  login: function login(user) {
    _AppDispatcher2.default.handleViewAction({
      actionType: _AppConstants2.default.LOGIN_USER,
      user: user

    });
  },
  registerUser: function registerUser(user) {
    _AppDispatcher2.default.handleViewAction({
      actionType: _AppConstants2.default.REGISTER_USER,
      user: user

    });
  },
  receiveErrors: function receiveErrors(errors) {
    // console.log(errors);
    _AppDispatcher2.default.handleViewAction({
      actionType: _AppConstants2.default.RECEIVE_ERRORS,
      errors: errors
    });
  },
  receiveSuccess: function receiveSuccess(message) {
    _AppDispatcher2.default.handleViewAction({
      actionType: _AppConstants2.default.RECEIVE_SUCCESS,
      message: message

    });
  },
  createGroup: function createGroup(group) {
    _AppDispatcher2.default.handleViewAction({
      actionType: _AppConstants2.default.CREATE_GROUP,
      group: group

    });
  },
  addUserToGroup: function addUserToGroup(usergroup) {
    _AppDispatcher2.default.handleViewAction({
      actionType: _AppConstants2.default.ADDUSER_GROUP,
      usergroup: usergroup

    });
  },
  addMessage: function addMessage(message) {
    _AppDispatcher2.default.handleViewAction({
      actionType: _AppConstants2.default.ADD_MESSAGE,
      message: message

    });
  },
  signOutUser: function signOutUser(user) {
    _AppDispatcher2.default.handleViewAction({
      actionType: _AppConstants2.default.SIGNOUT_USER,
      user: user

    });
  },
  receiveUserInGroupResults: function receiveUserInGroupResults(users) {
    _AppDispatcher2.default.handleViewAction({
      actionType: _AppConstants2.default.RECEIVE_USER_IN_GROUP_RESULTS,
      users: users

    });
  },
  receiveUserNotInGroupResults: function receiveUserNotInGroupResults(users) {
    _AppDispatcher2.default.handleViewAction({
      actionType: _AppConstants2.default.RECEIVE_USER_NOT_IN_GROUP_RESULTS,
      users: users

    });
  },
  receiveGroupMessages: function receiveGroupMessages(messages) {
    _AppDispatcher2.default.handleViewAction({
      actionType: _AppConstants2.default.RECEIVE_MESSAGE_RESULTS,
      messages: messages

    });
  },
  receiveUserGroups: function receiveUserGroups(groups) {
    _AppDispatcher2.default.handleViewAction({
      actionType: _AppConstants2.default.RECEIVE_GROUP_RESULTS,
      groups: groups

    });
  },
  receiveAuthenticatedUser: function receiveAuthenticatedUser(user) {
    _AppDispatcher2.default.handleViewAction({
      actionType: _AppConstants2.default.RECEIVE_AUTHENTICATED_USER,
      user: user

    });
  },
  selectGroup: function selectGroup(selectedGroupId) {
    _AppDispatcher2.default.handleViewAction({
      actionType: _AppConstants2.default.SELECT_GROUP,
      selectedGroupId: selectedGroupId

    });
  }
};

exports.default = AppActions;