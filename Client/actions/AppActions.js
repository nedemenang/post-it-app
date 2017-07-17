import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const AppActions = {
 // console.log('Logging user....');
  login(user) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.LOGIN_USER,
      user

    });
  },

  registerUser(user) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.REGISTER_USER,
      user

    });
  },

  receiveErrors(errors) {
    // console.log(errors);
    AppDispatcher.handleViewAction({
      actionType: AppConstants.RECEIVE_ERRORS,
      errors
    });
  },
  receiveSuccess(message) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.RECEIVE_SUCCESS,
      message

    });
  },

  createGroup(group) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.CREATE_GROUP,
      group

    });
  },

  addUserToGroup(user) {
    // console.log(usergroup);
    AppDispatcher.handleViewAction({
      actionType: AppConstants.ADDUSER_GROUP,
      user

    });
  },

  addMessage(message) {
    // console.log(message);
    AppDispatcher.handleViewAction({
      actionType: AppConstants.ADD_MESSAGE,
      message

    });
  },

  signOutUser(user) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.SIGNOUT_USER,
      user

    });
  },

  registerGoogleUser(idToken) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.REGISTER_GOOGLE_USER,
      idToken

    });
  },

  receiveUserInGroupResults(users) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.RECEIVE_USER_IN_GROUP_RESULTS,
      users

    });
  },

  receiveUserNotInGroupResults(users) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.RECEIVE_USER_NOT_IN_GROUP_RESULTS,
      users

    });
  },

  receiveGroupMessages(messages) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.RECEIVE_MESSAGE_RESULTS,
      messages

    });
  },

  receiveUserGroups(groups) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.RECEIVE_GROUP_RESULTS,
      groups

    });
  },

  receiveAuthenticatedUser(user) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.RECEIVE_AUTHENTICATED_USER,
      user

    });
  },

  resetPassword(emailAddress) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.RESET_PASSWORD,
      emailAddress

    });
  },

  confirmPasswordReset(resetObject) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.CONFIRM_RESET_PASSWORD,
      resetObject

    });
  },

  selectGroup(selectedGroup) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.SELECT_GROUP,
      selectedGroup

    });
  }

};

export default AppActions;
