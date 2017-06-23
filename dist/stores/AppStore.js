'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _AppAPI = require('../utils/AppAPI.js');

var _AppAPI2 = _interopRequireDefault(_AppAPI);

var _AppDispatcher = require('../dispatcher/AppDispatcher');

var _AppDispatcher2 = _interopRequireDefault(_AppDispatcher);

var _AppConstants = require('../constants/AppConstants');

var _AppConstants2 = _interopRequireDefault(_AppConstants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CHANGE_EVENT = 'change';

var _usersInGroup = [];
var _usersNotInGroup = [];
var _userGroups = [];
var _groupMessages = [];
var _errors = '';
var _success = '';
var _loggedInUser = [];
var _registeredUser = [];
var _selectedGroupId = '';
var _isAuthenticated = false;

var AppStore = (0, _objectAssign2.default)({}, _events.EventEmitter.prototype, {
  registerNewUser: function registerNewUser(user) {
    _registeredUser.push(user);
  },
  addUserToGroup: function addUserToGroup(user) {
    _usersInGroup.push(user);
  },
  postMessage: function postMessage(message) {
    _groupMessages.push(message);
  },
  createNewGroup: function createNewGroup(group) {
    _userGroups.push(group);
  },
  signinUser: function signinUser(user) {
    _loggedInUser.push(user);
    // console.log(_loggedInUser)
    // _isAuthenticated = true;
  },
  setIsAuthenticated: function setIsAuthenticated(value) {
    _isAuthenticated = value;
  },
  recieveError: function recieveError(error) {
    console.log(error);
    _errors = error;
  },
  receiveSuccess: function receiveSuccess(message) {
    _success = message;
  },
  getErrors: function getErrors() {
    return _errors;
  },
  getSelectedGroupId: function getSelectedGroupId() {
    return _selectedGroupId;
  },
  getLoggedInUser: function getLoggedInUser() {
    // this.signinUser();
    return _loggedInUser;
  },
  getRegisteredUser: function getRegisteredUser() {
    return _registeredUser;
  },
  getIsAuthenticated: function getIsAuthenticated() {
    return _isAuthenticated;
  },
  getUserGroups: function getUserGroups() {
    return _userGroups;
  },
  getGroupMessages: function getGroupMessages() {
    return _groupMessages;
  },
  getUsersInGroup: function getUsersInGroup() {
    return _usersInGroup;
  },
  getUsersNotInGroup: function getUsersNotInGroup() {
    return _usersNotInGroup;
  },
  getSuccess: function getSuccess() {
    return _success;
  },
  setUserGroups: function setUserGroups(groups) {
    _userGroups = groups;
  },
  setGroupMessages: function setGroupMessages(messages) {
    _groupMessages = messages;
  },
  setSelectedGroupId: function setSelectedGroupId(groupId) {
    _selectedGroupId = groupId;
  },
  setUsersInGroup: function setUsersInGroup(users) {
    _usersInGroup = users;
  },
  setUsersNotInGroup: function setUsersNotInGroup(users) {
    _usersNotInGroup = users;
  },
  emitChange: function emitChange() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function addChangeListener(callback) {
    this.on('change', callback);
  },
  removeChangeListener: function removeChangeListener(callback) {
    this.removeListener('change', callback);
  }
});

_AppDispatcher2.default.register(function (payload) {
  var action = payload.action;

  switch (action.actionType) {
    case _AppConstants2.default.REGISTER_USER:
      // console.log('Registering user...');
      // save to API
      _AppAPI2.default.registerNewUser(action.user);
      // store save
      AppStore.registerNewUser(action.user);

      // emit change
      AppStore.emit(CHANGE_EVENT);
      break;

    case _AppConstants2.default.LOGIN_USER:
      // console.log('logging in user...');
      //console.log(action.user);

      // save to API
      _AppAPI2.default.signinUser(action.user);
      // if (_errors === '') {
      // store save
      // console.log('errors');
      //  AppStore.signinUser(action.user);
      // }
      // emit change
      AppStore.emit(CHANGE_EVENT);
      break;

    case _AppConstants2.default.CREATE_GROUP:
      //console.log('create user group');
      // API store
      _AppAPI2.default.createNewGroup(action.group);

      // store save
      AppStore.createNewGroup(action.group);

      // emit change
      AppStore.emit(CHANGE_EVENT);
      break;

    case _AppConstants2.default.ADDUSER_GROUP:
      // console.log('add user group');
      // API store
      _AppAPI2.default.addUserToGroup(action.userGroup);

      // store save
      AppStore.addUserToGroup(action.userGroup);

      // emit change
      AppStore.emit(CHANGE_EVENT);
      break;

    case _AppConstants2.default.ADD_MESSAGE:

      // API store
      _AppAPI2.default.postMessage(action.message);

      // store save
      AppStore.postMessage(action.message);

      // emit change
      AppStore.emit(CHANGE_EVENT);
      break;

    case _AppConstants2.default.SIGNOUT_USER:

      // API store
      _AppAPI2.default.signOutUser();

      // store save
      AppStore.signOutUser();

      // emit change
      AppStore.emit(CHANGE_EVENT);
      break;

    case _AppConstants2.default.RECEIVE_USER_IN_GROUP_RESULTS:
      // console.log('logging in user...');

      // store save
      AppStore.setUsersInGroup(action.users);

      // emit change
      AppStore.emit(CHANGE_EVENT);
      break;

    case _AppConstants2.default.RECEIVE_USER_NOT_IN_GROUP_RESULTS:
      // store save
      AppStore.setUsersNotInGroup(action.users);

      // emit change
      AppStore.emit(CHANGE_EVENT);
      break;

    case _AppConstants2.default.RECEIVE_MESSAGE_RESULTS:
      // store save
      AppStore.setGroupMessages(action.messages);

      // emit change
      AppStore.emit(CHANGE_EVENT);
      break;

    case _AppConstants2.default.RECEIVE_GROUP_RESULTS:
      // store save
      AppStore.setUserGroups(action.groups);
      // emit change
      AppStore.emit(CHANGE_EVENT);
      break;

    case _AppConstants2.default.RECEIVE_SUCCESS:
      // store save
      AppStore.receiveSuccess(action.message);

      // emit change
      AppStore.emit(CHANGE_EVENT);
      break;

    case _AppConstants2.default.RECEIVE_ERROR:
      // store save
      AppStore.receiveError(action.message);

      // emit change
      AppStore.emit(CHANGE_EVENT);
      break;

    case _AppConstants2.default.RECEIVE_AUTHENTICATED_USER:
      // store save
      AppStore.signinUser(action.user);
      AppStore.setIsAuthenticated(true);
      // emit change
      AppStore.emit(CHANGE_EVENT);
      break;

    case _AppConstants2.default.SELECT_GROUP:

      // store save
      AppStore.setSelectedGroupId(action.selectedGroupId);

      // emit change
      AppStore.emit(CHANGE_EVENT);
      break;

    default:

  }

  return true;
});

exports.default = AppStore;