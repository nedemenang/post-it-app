import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

export const login = (user) => {
  AppDispatcher.handleViewAction({
    actionType: AppConstants.LOGIN_USER,
    user
  });
};

export const registerUser = (user) => {
  AppDispatcher.handleViewAction({
    actionType: AppConstants.REGISTER_USER,
    user

  });
};

export const receiveErrors = (errors) => {
  AppDispatcher.handleViewAction({
    actionType: AppConstants.RECEIVE_ERRORS,
    errors
  });
};

export const updateUserProfile = (user) => {
  AppDispatcher.handleViewAction({
    actionType: AppConstants.UPDATE_USER_PROFILE,
    user
  });
};


export const receiveSuccess = (message) => {
  AppDispatcher.handleViewAction({
    actionType: AppConstants.RECEIVE_SUCCESS,
    message

  });
};

export const createGroup = (group) => {
  AppDispatcher.handleViewAction({
    actionType: AppConstants.CREATE_GROUP,
    group

  });
};

export const addUserToGroup = (user) => {
  AppDispatcher.handleViewAction({
    actionType: AppConstants.ADDUSER_GROUP,
    user

  });
};

export const addMessage = (message) => {
  AppDispatcher.handleViewAction({
    actionType: AppConstants.ADD_MESSAGE,
    message
  });
};

export const updateMessageFlags = (updateObject) => {
  AppDispatcher.handleViewAction({
    actionType: AppConstants.UPDATE_MESSAGE_FLAGS,
    updateObject
  });
};

export const signOutUser = (user) => {
  AppDispatcher.handleViewAction({
    actionType: AppConstants.SIGNOUT_USER,
    user

  });
};

export const registerGoogleUser = (idToken) => {
  AppDispatcher.handleViewAction({
    actionType: AppConstants.REGISTER_GOOGLE_USER,
    idToken

  });
};

export const receiveUserInGroupResults = (users) => {
  AppDispatcher.handleViewAction({
    actionType: AppConstants.RECEIVE_USER_IN_GROUP_RESULTS,
    users

  });
};

export const receiveUserNotInGroupResults = (users) => {
  AppDispatcher.handleViewAction({
    actionType: AppConstants.RECEIVE_USER_NOT_IN_GROUP_RESULTS,
    users

  });
};

export const receiveGroupMessages = (messages) => {
  AppDispatcher.handleViewAction({
    actionType: AppConstants.RECEIVE_MESSAGE_RESULTS,
    messages

  });
};

export const receiveUserReadMessages = (usersRead) => {
  AppDispatcher.handleViewAction({
    actionType: AppConstants.RECEIVE_USER_READ_MESSAGES_RESULTS,
    usersRead
  });
};

export const receiveUserGroups = (groups) => {
  AppDispatcher.handleViewAction({
    actionType: AppConstants.RECEIVE_GROUP_RESULTS,
    groups

  });
};

export const receiveAuthenticatedUser = (user) => {
  AppDispatcher.handleViewAction({
    actionType: AppConstants.RECEIVE_AUTHENTICATED_USER,
    user

  });
};

export const resetPassword = (emailAddress) => {
  AppDispatcher.handleViewAction({
    actionType: AppConstants.RESET_PASSWORD,
    emailAddress

  });
};

export const confirmPasswordReset = (resetObject) => {
  AppDispatcher.handleViewAction({
    actionType: AppConstants.CONFIRM_RESET_PASSWORD,
    resetObject

  });
};

export const selectGroup = (selectedGroup) => {
  AppDispatcher.handleViewAction({
    actionType: AppConstants.SELECT_GROUP,
    selectedGroup

  });
};

