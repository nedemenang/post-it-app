
import { EventEmitter } from 'events';
import assign from 'object-assign';
import AppAPI from '../utils/appAPI';
import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';

let usersInGroup = [];
let usersNotInGroup = [];
let userGroups = [];
let groupMessages = [];
let usersReadMessage = [];
let errors = '';
let success = '';
const loggedInUser = [];
const registeredUser = [];
const selectedGroup = [];
let isAuthenticated = false;


const AppStore = assign({}, EventEmitter.prototype, {

  registerNewUser(user) {
    registeredUser.push(user);
  },

  addUserToGroup(user) {
    usersInGroup.push(user);
  },

  postMessage(message) {
    groupMessages.push(message);
  },

  createNewGroup(group) {
    userGroups.push(group);
  },

  signinUser(user) {
    loggedInUser.push(user);
  },

  signOutUser() {
    loggedInUser.pop();
  },

  setIsAuthenticated(value) {
    isAuthenticated = value;
  },

  receiveErrors(error) {
    errors = error;
  },

  receiveSuccess(message) {
    success = message;
  },

  getErrors() {
    return errors;
  },

  getSelectedGroup() {
    return selectedGroup;
  },

  getLoggedInUser() {
    return loggedInUser;
  },

  getRegisteredUser() {
    return registeredUser;
  },

  getIsAuthenticated() {
    return isAuthenticated;
  },

  getUserGroups() {
    return userGroups;
  },

  getGroupMessages() {
    return groupMessages;
  },

  getUsersReadMessage() {
    return usersReadMessage;
  },

  getUsersInGroup() {
    return usersInGroup;
  },

  getUsersNotInGroup() {
    return usersNotInGroup;
  },

  getSuccess() {
    return success;
  },

  setUserGroups(groups) {
    userGroups = groups;
  },

  setGroupMessages(messages) {
    groupMessages = messages;
  },

  setUserReadMessages(usersRead) {
    usersReadMessage = usersRead;
  },

  setSelectedGroup(group) {
    selectedGroup.pop();
    selectedGroup.push(group);
  },

  setUsersInGroup(users) {
    usersInGroup = users;
  },

  setUsersNotInGroup(users) {
    usersNotInGroup = users;
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
    // save to API
    AppAPI.registerNewUser(action.user);
      // store save
    AppStore.registerNewUser(action.user);

    // emit change
    AppStore.emit(CHANGE_EVENT);
    break;

  case AppConstants.UPDATE_USER_PROFILE:
    // save to API
    AppAPI.updateUserProfile(action.user);
      // store save

    // emit change
    AppStore.emit(CHANGE_EVENT);
    break;

  case AppConstants.REGISTER_GOOGLE_USER:

    AppAPI.signinGoogleUser(action.idToken);

    AppStore.emit(CHANGE_EVENT);
    break;

  case AppConstants.RESET_PASSWORD:

    AppAPI.resetPassword(action.emailAddress);

    AppStore.emit(CHANGE_EVENT);
    break;

  case AppConstants.CONFIRM_RESET_PASSWORD:

    AppAPI.confirmResetPassword(action.resetObject);

    AppStore.emit(CHANGE_EVENT);
    break;

  case AppConstants.LOGIN_USER:

    AppAPI.signinUser(action.user);

    AppStore.emit(CHANGE_EVENT);
    break;

  case AppConstants.CREATE_GROUP:
    // API store
    AppAPI.createNewGroup(action.group);

    // store save
    AppStore.createNewGroup(action.group);

    // emit change
    AppStore.emit(CHANGE_EVENT);
    break;

  case AppConstants.ADDUSER_GROUP:
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

  case AppConstants.UPDATE_MESSAGE_FLAGS:

    // API store
    AppAPI.updateMessageFlag(action.updateObject);

    // emit change
    AppStore.emit(CHANGE_EVENT);
    break;

  case AppConstants.SIGNOUT_USER:

    // API store
    AppAPI.signoutUser();


    // store save
    AppStore.signOutUser();
    AppStore.setIsAuthenticated(false);
    // emit change
    AppStore.emit(CHANGE_EVENT);
    break;

  case AppConstants.RECEIVE_USER_IN_GROUP_RESULTS:

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

  case AppConstants.RECEIVE_USER_READ_MESSAGES_RESULTS:
    // store save
    AppStore.setUserReadMessages(action.usersRead);

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
