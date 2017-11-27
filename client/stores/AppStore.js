import { EventEmitter } from 'events';
import assign from 'object-assign';
import toastr from 'toastr';
import { registerNewUser, updateUserProfile,
signinGoogleUser, resetPassword, confirmResetPassword,
signinUser, createNewGroup, addUserToGroup,
postMessage, updateMessageFlag,
signoutUser } from '../utils/appAPI';
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
let selectedGroup = {};
let isAuthenticated = false;
const loggedInUser = [];
const registeredUser = [];


const AppStore = assign({}, EventEmitter.prototype, {

  /**
   * Register new user store call
   *
   * @param {object} user user object
   *
   * @returns {null} null
   */
  registerNewUser(user) {
    registeredUser.push(user);
  },

   /**
   * Add to user store call
   *
   * @param {object} user user object
   *
   * @returns {null} null
   */
  addUserToGroup(user) {
    usersInGroup.push(user);
  },

   /**
   * Post message store cal
   *
   * @param {object} message message object
   *
   * @returns {null} null
   */
  postMessage(message) {
    groupMessages.push(message);
  },

   /**
   * create new group store call
   *
   * @param {object} group group object
   *
   * @returns {null} null
   */
  createNewGroup(group) {
    userGroups.push(group);
  },

   /**
   * sign in user store call
   *
   * @param {object} user user object
   *
   * @returns {null} null
   */
  signinUser(user) {
    loggedInUser.push(user);
  },

   /**
   * Sign out user store call
   *
   * @param {null} null null
   *
   * @returns {null} null
   */
  signOutUser() {
    loggedInUser.pop();
  },

   /**
   * set is authenticated store call
   *
   * @param {boolean} value boolean
   *
   * @returns {null} null
   */
  setIsAuthenticated(value) {
    isAuthenticated = value;
  },

   /**
   * Recieve error store call
   *
   * @param {string} error error string
   *
   * @returns {null} null
   */
  receiveErrors(error) {
    if (error !== '' && typeof error !== 'undefined') {
      toastr.error(error);
      errors = error;
    }
  },

   /**
   * Recieve success store call
   *
   * @param {string} message message string
   *
   * @returns {null} null
   */
  receiveSuccess(message) {
    if (message !== '' && typeof message !== 'undefined') {
      toastr.success(message);
      success = message;
    }
  },

   /**
   * Get errors store call
   *
   * @param {null} null null
   *
   * @returns {string} error string
   */
  getErrors() {
    return errors;
  },

   /**
   * Get selected group store call
   *
   * @param {null} null null
   *
   * @returns {object} group object
   */
  getSelectedGroup() {
    return selectedGroup;
  },

  /**
   * get logged in user store call
   *
   * @param {null} null null
   *
   * @returns {array} user array
   */
  getLoggedInUser() {
    return loggedInUser;
  },

  /**
   * get registered user store call
   *
   * @param {null} null null
   *
   * @returns {array} user array
   */
  getRegisteredUser() {
    return registeredUser;
  },

  /**
   * get logged in user store call
   *
   * @param {null} null null
   *
   * @returns {boolean} isAutenticated boolean
   */
  getIsAuthenticated() {
    return isAuthenticated;
  },

  /**
   * get user group store call
   *
   * @param {null} null null
   *
   * @returns {array} group array
   */
  getUserGroups() {
    return userGroups;
  },

  /**
   * get group messages store call
   *
   * @param {null} null null
   *
   * @returns {array} group messages array
   */
  getGroupMessages() {
    return groupMessages;
  },

  /**
   * get user read messages store call
   *
   * @param {null} null null
   *
   * @returns {array} user read messages array
   */
  getUsersReadMessage() {
    return usersReadMessage;
  },

  /**
   * get user in group store call
   *
   * @param {null} null null
   *
   * @returns {array} user array
   */
  getUsersInGroup() {
    return usersInGroup;
  },

  /**
   * get users not in group store call
   *
   * @param {null} null null
   *
   * @returns {array} user array
   */
  getUsersNotInGroup() {
    return usersNotInGroup;
  },

  /**
   * get success store call
   *
   * @param {null} null null
   *
   * @returns {string} success string
   */
  getSuccess() {
    return success;
  },

  /**
   * set user groups store call
   *
   * @param {array} groups array
   *
   * @returns {null} null
   */
  setUserGroups(groups) {
    userGroups = groups;
  },

  /**
   * set group messages store call
   *
   * @param {array} messages array
   *
   * @returns {null} null
   */
  setGroupMessages(messages) {
    groupMessages = messages;
  },

  /**
   * set user read messages store call
   *
   * @param {array} usersRead array
   *
   * @returns {null} null
   */
  setUserReadMessages(usersRead) {
    usersReadMessage = usersRead;
  },

  /**
   * set selected group store call
   *
   * @param {object} group object
   *
   * @returns {null} null
   */
  setSelectedGroup(group) {
    selectedGroup = group;
  },

  /**
   * set users in  groups store call
   *
   * @param {array} users array
   *
   * @returns {null} null
   */
  setUsersInGroup(users) {
    usersInGroup = users;
  },

  /**
   * set users not groups store call
   *
   * @param {array} users array
   *
   * @returns {null} null
   */
  setUsersNotInGroup(users) {
    usersNotInGroup = users;
  },

  /**
   * emit changes store call
   *
   * @param {null} null
   *
   * @returns {null} null
   */
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * add change listener store call
   *
   * @param {object} callback object
   *
   * @returns {null} null
   */
  addChangeListener(callback) {
    this.on('change', callback);
  },

  /**
   * remove change listener store call
   *
   * @param {callback} callback object
   *
   * @returns {null} null
   */
  removeChangeListener(callback) {
    this.removeListener('change', callback);
  }
});

/**
   * app dispatcher register store call
   *
   * @param {object} payload object
   *
   * @returns {null} null
   */
AppDispatcher.register((payload) => {
  const action = payload.action;

  switch (action.actionType) {
  case AppConstants.REGISTER_USER:
    // save to API
    registerNewUser(action.user);
      // store save
    AppStore.registerNewUser(action.user);

    // emit change
    AppStore.emit(CHANGE_EVENT);
    break;

  case AppConstants.UPDATE_USER_PROFILE:
    // save to API
    updateUserProfile(action.user);
      // store save

    // emit change
    AppStore.emit(CHANGE_EVENT);
    break;

  case AppConstants.REGISTER_GOOGLE_USER:

    signinGoogleUser(action.idToken);

    AppStore.emit(CHANGE_EVENT);
    break;

  case AppConstants.RESET_PASSWORD:

    resetPassword(action.emailAddress);

    AppStore.emit(CHANGE_EVENT);
    break;

  case AppConstants.CONFIRM_RESET_PASSWORD:

    confirmResetPassword(action.resetObject);

    AppStore.emit(CHANGE_EVENT);
    break;

  case AppConstants.LOGIN_USER:

    signinUser(action.user);

    AppStore.emit(CHANGE_EVENT);
    break;

  case AppConstants.CREATE_GROUP:
    // API store
    createNewGroup(action.group);

    // store save
    AppStore.createNewGroup(action.group);

    // emit change
    AppStore.emit(CHANGE_EVENT);
    break;

  case AppConstants.ADDUSER_GROUP:
    // API store
    addUserToGroup(action.user);

    // store save
    AppStore.addUserToGroup(action.user);

    // emit change
    AppStore.emit(CHANGE_EVENT);
    break;

  case AppConstants.ADD_MESSAGE:

    // API store
    postMessage(action.message);


    // store save
    AppStore.postMessage(action.message);

    // emit change
    AppStore.emit(CHANGE_EVENT);
    break;

  case AppConstants.UPDATE_MESSAGE_FLAGS:

    // API store
    updateMessageFlag(action.updateObject);

    // emit change
    AppStore.emit(CHANGE_EVENT);
    break;

  case AppConstants.SIGNOUT_USER:

    // API store
    signoutUser();


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
