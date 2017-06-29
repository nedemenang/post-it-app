
import { EventEmitter } from 'events';
import assign from 'object-assign';
import AppAPI from '../utils/appAPI.js';
import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';

let _usersInGroup = [];
let _usersNotInGroup = [];
let _userGroups = [];
let _groupMessages = [];
let _errors = '';
let _success = '';
const _loggedInUser = [];
const _registeredUser = [];
let _selectedGroup = [];
let _isAuthenticated = false;


const AppStore = assign({}, EventEmitter.prototype, {

  registerNewUser(user) {
    _registeredUser.push(user);
  },

  addUserToGroup(user) {
    _usersInGroup.push(user);
  },

  postMessage(message) {
     // console.log(message);
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

  signOutUser() {
    console.log('signing out...');
    _loggedInUser.pop();
  },

  setIsAuthenticated(value) {
    _isAuthenticated = value;
  },

  receiveErrors(error) {
    console.log(error);
    _errors = error;
  },

  receiveSuccess(message) {
    _success = message;
  },

  getErrors() {
    return _errors;
  },

  getSelectedGroup() {
    return _selectedGroup;
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
    //console.log(groups);
    _userGroups = groups;
  },

  setGroupMessages(messages) {
  //  console.log(messages);
    _groupMessages = messages;
  },

  setSelectedGroup(group) {
    //console.log(_selectedGroup);
    _selectedGroup.pop();
    _selectedGroup.push(group);
    //console.log(_selectedGroup);
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
    // console.log(action.user);

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
    // console.log('create user group');
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
    AppAPI.addUserToGroup(action.user);

    // store save
    AppStore.addUserToGroup(action.user);

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
    AppAPI.signoutUser();


    // store save
    AppStore.signOutUser();
    //AppStore.setIsAuthenticated(false);
    // console.log(_isAuthenticated);
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
    //console.log(action.messages);
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

  case AppConstants.RECEIVE_ERRORS:
    // store save
    //console.log(action.errors);
    AppStore.receiveErrors(action.errors);

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
  // console.log(`sets selected group from appstore ${action.selectedGroupId}`);
    // store save
    AppStore.setSelectedGroup(action.selectedGroup);

    // emit change
    AppStore.emit(CHANGE_EVENT);
    break;

  default:

  }

  return true;
});

export default AppStore;
