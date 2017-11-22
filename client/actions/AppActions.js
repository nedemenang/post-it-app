import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

/**
   *
   * Login Action call
   *
   * @param {Object} user user object
   *
   * @returns {null} null
   */
export const login = (user) => {
  AppDispatcher.handleViewAction({
    actionType: AppConstants.LOGIN_USER,
    user
  });
};


/**
   *
   * register user Action call
   *
   * @param {Object} user user object
   *
   * @returns {null} null
   */
export const registerUser = (user) => {
  AppDispatcher.handleViewAction({
    actionType: AppConstants.REGISTER_USER,
    user

  });
};

/**
   *
   * recieve Action call
   *
   * @param {string} errors error string
   *
   * @returns {null} null
   */
export const receiveErrors = (errors) => {
  AppDispatcher.handleViewAction({
    actionType: AppConstants.RECEIVE_ERRORS,
    errors
  });
};

/**
   *
   * update user profile Action call
   *
   * @param {Object} user user object
   *
   * @returns {null} null
   */
export const updateUserProfile = (user) => {
  AppDispatcher.handleViewAction({
    actionType: AppConstants.UPDATE_USER_PROFILE,
    user
  });
};


/**
   *
   * recieve success Action call
   *
   * @param {string} message message string
   *
   * @returns {null} null
   */
export const receiveSuccess = (message) => {
  AppDispatcher.handleViewAction({
    actionType: AppConstants.RECEIVE_SUCCESS,
    message

  });
};

/**
   *
   * Create group Action call
   *
   * @param {Object} group group object object
   *
   * @returns {null} null
   */
export const createGroup = (group) => {
  AppDispatcher.handleViewAction({
    actionType: AppConstants.CREATE_GROUP,
    group

  });
};

/**
   *
   * add to group Action call
   *
   * @param {Object} user user object
   *
   * @returns {null} null
   */
export const addUserToGroup = (user) => {
  AppDispatcher.handleViewAction({
    actionType: AppConstants.ADDUSER_GROUP,
    user

  });
};

/**
   *
   * add message Action call
   *
   * @param {Object} message message object
   *
   * @returns {null} null
   */
export const addMessage = (message) => {
  AppDispatcher.handleViewAction({
    actionType: AppConstants.ADD_MESSAGE,
    message
  });
};

/**
   *
   * update message flag Action call
   *
   * @param {Object} updateObject user update object
   *
   * @returns {null} null
   */
export const updateMessageFlags = (updateObject) => {
  AppDispatcher.handleViewAction({
    actionType: AppConstants.UPDATE_MESSAGE_FLAGS,
    updateObject
  });
};

/**
   *
   * Sign out Action call
   *
   * @param {Object} user user object
   *
   * @returns {null} null
   */
export const signOutUser = (user) => {
  AppDispatcher.handleViewAction({
    actionType: AppConstants.SIGNOUT_USER,
    user

  });
};

/**
   *
   * Google Register Action call
   *
   * @param {string} idToken idtoken string
   *
   * @returns {null} null
   */
export const registerGoogleUser = (idToken) => {
  AppDispatcher.handleViewAction({
    actionType: AppConstants.REGISTER_GOOGLE_USER,
    idToken

  });
};

/**
   *
   * recieve users in group Action call
   *
   * @param {Array} users users array
   *
   * @returns {null} null
   */
export const receiveUserInGroupResults = (users) => {
  AppDispatcher.handleViewAction({
    actionType: AppConstants.RECEIVE_USER_IN_GROUP_RESULTS,
    users

  });
};

/**
   *
   * recieve users not in group Action call
   *
   * @param {Array} users users array
   *
   * @returns {null} null
   */
export const receiveUserNotInGroupResults = (users) => {
  AppDispatcher.handleViewAction({
    actionType: AppConstants.RECEIVE_USER_NOT_IN_GROUP_RESULTS,
    users

  });
};

/**
   *
   * recieve messages Action call
   *
   * @param {Array} messages messages array
   *
   * @returns {null} null
   */
export const receiveGroupMessages = (messages) => {
  AppDispatcher.handleViewAction({
    actionType: AppConstants.RECEIVE_MESSAGE_RESULTS,
    messages

  });
};

/**
   *
   * recieve users read messages Action call
   *
   * @param {Array} users usersRead array
   *
   * @returns {null} null
   */
export const receiveUserReadMessages = (usersRead) => {
  AppDispatcher.handleViewAction({
    actionType: AppConstants.RECEIVE_USER_READ_MESSAGES_RESULTS,
    usersRead
  });
};

/**
   *
   * recieve users group Action call
   *
   * @param {Array} groups groups array
   *
   * @returns {null} null
   */
export const receiveUserGroups = (groups) => {
  AppDispatcher.handleViewAction({
    actionType: AppConstants.RECEIVE_GROUP_RESULTS,
    groups

  });
};

/**
   *
   * recieve authenticated user Action call
   *
   * @param {object} user user object
   *
   * @returns {null} null
   */
export const receiveAuthenticatedUser = (user) => {
  AppDispatcher.handleViewAction({
    actionType: AppConstants.RECEIVE_AUTHENTICATED_USER,
    user

  });
};

/**
   *
   * reset password Action call
   *
   * @param {String} emailAddress email address string
   *
   * @returns {null} null
   */
export const resetPassword = (emailAddress) => {
  AppDispatcher.handleViewAction({
    actionType: AppConstants.RESET_PASSWORD,
    emailAddress

  });
};

/**
   *
   * confirm password reset Action call
   *
   * @param {resetObject} resetObject reset object
   *
   * @returns {null} null
   */
export const confirmPasswordReset = (resetObject) => {
  AppDispatcher.handleViewAction({
    actionType: AppConstants.CONFIRM_RESET_PASSWORD,
    resetObject

  });
};

/**
   *
   * select group Action call
   *
   * @param {Object} selectedGroup selected group object
   *
   * @returns {null} null
   */
export const selectGroup = (selectedGroup) => {
  AppDispatcher.handleViewAction({
    actionType: AppConstants.SELECT_GROUP,
    selectedGroup

  });
};

