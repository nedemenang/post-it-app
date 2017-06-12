
import { EventEmitter } from 'events';
import assign from 'object-assign';
import AppAPI from '../utils/AppAPI.js';
import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';

let _users = [];
const _groups = [];
const _messages = [];
const _errors = [];
const _logInErrors = [];
const _registerUserErrors = [];
const _success = [];
const _loggedInUser = [];
const _registeredUser = [];


const AppStore = assign({}, EventEmitter.prototype, {

  registerNewUser(user) {
    _registeredUser.push(user);
    console.log(_registeredUser);
  },

  recieveError(error) {
    _errors.push(error);
  },

  receiveSuccess(message) {
    _success.push(message);
  },

  signinUser(user) {
    _users.push(user);
  },

  getUser() {
    return _users;
  },


  setUsers(users) {
    _users = users;
  },

  getGroups() {
    return _groups;
  },
  getMessages() {
    return _messages;
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
    console.log('Registering user...');

    // store save
    AppStore.registerNewUser(action.user);

    // save to API
    AppAPI.registerNewUser(action.user);

    // emit change
    AppStore.emit(CHANGE_EVENT);
    break;

  case AppConstants.RECEIVE_ERRORS:
    // store save
    AppStore.recieveError(action.errors);

    // emit change
    AppStore.emit(CHANGE_EVENT);
    break;

  case AppConstants.RECEIVE_SUCCESS:
    // store save
    AppStore.receiveSuccess(action.message);

    // emit change
    AppStore.emit(CHANGE_EVENT);
    break;

  case AppConstants.LOGIN_USER:
    console.log('logging in user...');

    // store save
    AppStore.signinUser(action.user);

    // save to API
    AppAPI.signinUser(action.user);

    // emit change
    AppStore.emit(CHANGE_EVENT);
    break;

  case AppConstants.RECEIVE_USER_RESULTS:
    console.log('logging in user...');

    // store save
    AppStore.setUsers(action.users);

    // save to API

    // emit change
    AppStore.emit(CHANGE_EVENT);
    break;

  default:

  }

  return true;
});

export default AppStore;
