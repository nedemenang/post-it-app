
import { EventEmitter } from 'events';
import assign from 'object-assign';
import AppAPI from '../utils/AppAPI.js';
import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';

let _usersInGroup = [];
let _usersNotInGroup = [];
let _userGroups = [];
let _groupMessages = [];
let _errors = '';
let _success = '';
let _loggedInUser = [];
const _registeredUser = [];
let _selectedGroupId = '';
let _isAuthenticated = false;


const AppStore = assign({}, EventEmitter.prototype, {

  registerNewUser(user) {
    _registeredUser.push(user);
  },

  addUserToGroup(user) {
    _usersInGroup.push(user);
  },

  postMessage(message) {
    _groupMessages.push(message);
  },

  createNewGroup(group) {
    _userGroups.push(group);
  },

  signinUser(user) {
    _loggedInUser.push(user); 
    // console.log(_loggedInUser)
    // _isAuthenticated = true;
  },

  setIsAuthenticated(value) {
    _isAuthenticated = value;
  },

  recieveError(error) {
    console.log(error);
    _errors = error;
  },

  receiveSuccess(message) {
    _success = message;
  },

  getErrors() {
    return _errors;
  },

  getSelectedGroupId() {
    return _selectedGroupId;
  },

  getLoggedInUser() {
    // this.signinUser();
    return _loggedInUser;
  },

  getRegisteredUser() {
    return _registeredUser;
  },

  getIsAuthenticated() {
    return _isAuthenticated;
  },

  getUserGroups() {
    return _userGroups;
  },

  getGroupMessages() {
    return _groupMessages;
  },

  getUsersInGroup() {
    return _usersInGroup;
  },

  getUsersNotInGroup() {
    return _usersNotInGroup;
  },

  getSuccess() {
    return _success;
  },

  setUserGroups(groups) {
    _userGroups = groups;
  },

  setGroupMessages(messages) {
    _groupMessages = messages;
  },

  setSelectedGroupId(groupId) {
    _selectedGroupId = groupId;
  },

  setUsersInGroup(users) {
    _usersInGroup = users;
  },

  setUsersNotInGroup(users) {
    _usersNotInGroup = users;
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener(callback) {
    this.on('change', callback);
  },
  removeChangeListener(callback) {
    this.removeListener('change', callback);
  }
});

AppDispatcher.register((payload) => {
  const action = payload.action;

  switch (action.actionType) {
  case AppConstants.REGISTER_USER:
    // console.log('Registering user...');
    // save to API
    AppAPI.registerNewUser(action.user);
      // store save
    AppStore.registerNewUser(action.user);

    // emit change
    AppStore.emit(CHANGE_EVENT);
    break;

  case AppConstants.LOGIN_USER:
    // console.log('logging in user...');
    //console.log(action.user);

    // save to API
    AppAPI.signinUser(action.user);
    // if (_errors === '') {
    // store save
      // console.log('errors');
    //  AppStore.signinUser(action.user);
    // }
    // emit change
    AppStore.emit(CHANGE_EVENT);
    break;

  case AppConstants.CREATE_GROUP:
    //console.log('create user group');
    // API store
    AppAPI.createNewGroup(action.group);

    // store save
    AppStore.createNewGroup(action.group);

    // emit change
    AppStore.emit(CHANGE_EVENT);
    break;

  case AppConstants.ADDUSER_GROUP:
   // console.log('add user group');
    // API store
    AppAPI.addUserToGroup(action.userGroup);

    // store save
    AppStore.addUserToGroup(action.userGroup);

    // emit change
    AppStore.emit(CHANGE_EVENT);
    break;

  case AppConstants.ADD_MESSAGE:

    // API store
    AppAPI.postMessage(action.message);

    // store save
    AppStore.postMessage(action.message);

    // emit change
    AppStore.emit(CHANGE_EVENT);
    break;

  case AppConstants.SIGNOUT_USER:

    // API store
    AppAPI.signOutUser();


    // store save
    AppStore.signOutUser();

    // emit change
    AppStore.emit(CHANGE_EVENT);
    break;

  case AppConstants.RECEIVE_USER_IN_GROUP_RESULTS:
   // console.log('logging in user...');

    // store save
    AppStore.setUsersInGroup(action.users);

    // emit change
    AppStore.emit(CHANGE_EVENT);
    break;

  case AppConstants.RECEIVE_USER_NOT_IN_GROUP_RESULTS:
    // store save
    AppStore.setUsersNotInGroup(action.users);

    // emit change
    AppStore.emit(CHANGE_EVENT);
    break;

  case AppConstants.RECEIVE_MESSAGE_RESULTS:
    // store save
    AppStore.setGroupMessages(action.messages);

    // emit change
    AppStore.emit(CHANGE_EVENT);
    break;

  case AppConstants.RECEIVE_GROUP_RESULTS:
    // store save
    AppStore.setUserGroups(action.groups);
    // emit change
    AppStore.emit(CHANGE_EVENT);
    break;

  case AppConstants.RECEIVE_SUCCESS:
    // store save
    AppStore.receiveSuccess(action.message);

    // emit change
    AppStore.emit(CHANGE_EVENT);
    break;

  case AppConstants.RECEIVE_ERROR:
    // store save
    AppStore.receiveError(action.message);

    // emit change
    AppStore.emit(CHANGE_EVENT);
    break;

  case AppConstants.RECEIVE_AUTHENTICATED_USER:
    // store save
    AppStore.signinUser(action.user);
    AppStore.setIsAuthenticated(true);
    // emit change
    AppStore.emit(CHANGE_EVENT);
    break;

  case AppConstants.SELECT_GROUP:

    // store save
    AppStore.setSelectedGroupId(action.selectedGroupId);

    // emit change
    AppStore.emit(CHANGE_EVENT);
    break;

  default:

  }

  return true;
});

export default AppStore;
