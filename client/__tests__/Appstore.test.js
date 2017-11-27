import AppConstants from '../constants/AppConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';

/* global jest */
jest.mock('axios');
jest.mock('../dispatcher/AppDispatcher');

describe('App store', () => {
  let mockCall;
  beforeEach(() => {
    const appApi = require('../utils/appAPI');  // eslint-disable-line
    const appStore = require('../stores/AppStore'); // eslint-disable-line
    mockCall = AppDispatcher.register.mock.calls[0][0]; // eslint-disable-line
  });

  const errors = 'This is an error message';
  const message = 'This is a success message';

  const resetObject = {
    code: '09dfw92osw09wedf0394gs',
    newPassword: 'newpassword'
  };
  const emailAddress = 'validemail@gmail.com';
  const user = {
    email: 'alec_hartmann94@yahoo.com',
    password: 'password',
    isAuthenticated: false,
    profilePic: ''
  };

  const messages = [{
    messageBody: 'music is life',
    postedOn: '10/17/2017, 4:15:54 PM',
    priority: 'critical',
    postedBy: 'validuser@email.com',
    postedByDisplayName: 'validuser',
    profilePic: '',
    groupId: '-kW3o43WpdoI903dw',
    groupName: 'valid group'
  },
  {
    messageBody: 'music is life number 2',
    postedOn: '10/17/2027, 4:15:54 PM',
    priority: 'critical',
    postedBy: 'validuser99@email.com',
    postedByDisplayName: 'validuser99',
    profilePic: '',
    groupId: '-kW3o43WpdpooI903dw',
    groupName: 'valid groups'
  }];

  const users = [{
    email: 'alec_trebek@yahoo.com',
    password: 'password',
    isAuthenticated: false,
    profilePic: ''
  },
  {
    email: 'alec_baldwin@yahoo.com',
    password: 'password',
    isAuthenticated: false,
    profilePic: ''
  },
  {
    email: 'alec_thegreat@yahoo.com',
    password: 'password',
    isAuthenticated: false,
    profilePic: ''
  },
  {
    email: 'alec_guinness@yahoo.com',
    password: 'password',
    isAuthenticated: false,
    profilePic: ''
  }];

  const loginAction = {
    source: 'VIEW_ACTION',
    action: {
      actionType: AppConstants.LOGIN_USER,
      user,
    },
  };

  const receiveAuthenticatedUser = {
    source: 'VIEW_ACTION',
    action: {
      actionType: AppConstants.RECEIVE_AUTHENTICATED_USER,
      user,
    },
  };

  const signUp = {
    source: 'VIEW_ACTION',
    action: {
      actionType: AppConstants.REGISTER_USER,
      user,
    },
  };

  const registerError = {
    source: 'VIEW_ACTION',
    action: {
      actionType: AppConstants.RECEIVE_ERRORS,
      errors,
    },
  };

  const registerSuccess = {
    source: 'VIEW_ACTION',
    action: {
      actionType: AppConstants.RECEIVE_SUCCESS,
      message,
    },
  };

  const getUserGroupMessages = {
    source: 'VIEW_ACTION',
    action: {
      actionType: AppConstants.RECEIVE_MESSAGE_RESULTS,
      messages,
    },
  };

  const getUsersNotInGroups = {
    source: 'VIEW_ACTION',
    action: {
      actionType: AppConstants.RECEIVE_USER_NOT_IN_GROUP_RESULTS,
      users,
    },
  };

  const passwordReset = {
    source: 'VIEW_ACTION',
    action: {
      actionType: AppConstants.RESET_PASSWORD,
      emailAddress,
    },
  };

  const confirmPasswordReset = {
    source: 'VIEW_ACTION',
    action: {
      actionType: AppConstants.CONFIRM_RESET_PASSWORD,
      resetObject,
    },
  };

  const updateUsers = {
    source: 'VIEW_ACTION',
    action: {
      actionType: AppConstants.UPDATE_USER_PROFILE,
      user,
    },
  };

  const group = {
    groupName: 'Test Group Name',
    dateCreated: '10/17/2017, 4:15:54 PM',
    createdBy: 'validuser@email.com',
    creatorName: 'validuser',
    createdByProfilePic: '',
    creatorId: '-kW3o43WpdoI903dw'
  };

  const groups = [{
    groupName: 'Test Group Name2',
    dateCreated: '10/15/2017, 4:15:54 PM',
    createdBy: 'valid@email.com',
    creatorName: 'valid',
    createdByProfilePic: '',
    creatorId: '-kW3o43Wpf4roI903dw'
  },
  {
    groupName: 'Test Group Name',
    dateCreated: '10/17/2017, 4:15:54 PM',
    createdBy: 'validuser@email.com',
    creatorName: 'validuser',
    createdByProfilePic: '',
    creatorId: '-kW3o43WpdoI903dw'
  }];

  const receiveGroup = {
    source: 'VIEW_ACTION',
    action: {
      actionType: AppConstants.RECEIVE_GROUP_RESULTS,
      groups,
    },
  };

  const createGroup = {
    source: 'VIEW_ACTION',
    action: {
      actionType: AppConstants.CREATE_GROUP,
      group,
    },
  };

  it('initializes with no logged in user', () => {
    const appStore = require('../stores/AppStore'); // eslint-disable-line
    const loggedInUser = appStore.default.getLoggedInUser();
    expect(loggedInUser).toEqual([]);
  });

  it('should successfully recieve error messages', () => {
    const appStore = require('../stores/AppStore');  // eslint-disable-line
    mockCall(registerError);
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
    const errorFunction = appStore.default.getErrors();
    expect(errorFunction).toEqual(errors);
  });

  it('should successfully recieve success messages', () => {
    const appStore = require('../stores/AppStore');  // eslint-disable-line
    mockCall(registerSuccess);
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
    const runSuccess = appStore.default.getSuccess();
    expect(runSuccess).toEqual(message);
  });

  it('should successfully recieve group messages', () => {
    const appStore = require('../stores/AppStore');  // eslint-disable-line
    mockCall(receiveGroup);
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
    const userGroups = appStore.default.getUserGroups();
    expect(userGroups).toEqual(groups);
  });

  it('should successfully recieve authenticated users', () => {
    const appStore = require('../stores/AppStore');  // eslint-disable-line
    mockCall(receiveAuthenticatedUser);
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
    const loggedInUser = appStore.default.getLoggedInUser();
    expect(loggedInUser).toEqual([user]);
  });

  it('should successfully recieve users not in groups', () => {
    const appStore = require('../stores/AppStore');  // eslint-disable-line
    mockCall(getUsersNotInGroups);
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
    const usersNotInGroups = appStore.default.getUsersNotInGroup();
    expect(usersNotInGroups).toEqual(users);
  });

  it('should successfully recieve messages', () => {
    const appStore = require('../stores/AppStore');  // eslint-disable-line
    mockCall(getUserGroupMessages);
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
    const userGroupMessages = appStore.default.getGroupMessages();
    expect(userGroupMessages).toEqual(messages);
  });

  it('should successfully call the signIn API', () => {
    const appApi = require('../utils/appAPI');  // eslint-disable-line
    const signinSpy = spyOn(appApi, 'signinUser');
    mockCall(loginAction);
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
    expect(signinSpy).toHaveBeenCalledWith(user);
  });

  it('should successfully call the create group API', () => {
    const appApi = require('../utils/appAPI');  // eslint-disable-line
    const createGroupSpy = spyOn(appApi, 'createNewGroup');
    mockCall(createGroup);
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
    expect(createGroupSpy).toHaveBeenCalledWith(group);
  });

  it('should successfully call the register user API', () => {
    const appApi = require('../utils/appAPI');  // eslint-disable-line
    const registerUserSpy = spyOn(appApi, 'registerNewUser');
    mockCall(signUp);
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
    expect(registerUserSpy).toHaveBeenCalledWith(user);
  });

  it('should successfully call the update user profile API', () => {
    const appApi = require('../utils/appAPI');  // eslint-disable-line
    const updateUserSpy = spyOn(appApi, 'updateUserProfile');
    mockCall(updateUsers);
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
    expect(updateUserSpy).toHaveBeenCalledWith(user);
  });

  it('should successfully call the password reset API', () => {
    const appApi = require('../utils/appAPI');  // eslint-disable-line
    const passwordResetSpy = spyOn(appApi, 'resetPassword');
    mockCall(passwordReset);
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
    expect(passwordResetSpy).toHaveBeenCalledWith(emailAddress);
  });

  it('should successfully call the confirm password reset API', () => {
    const appApi = require('../utils/appAPI');  // eslint-disable-line
    const confirmPasswordResetSpy = spyOn(appApi, 'confirmResetPassword');
    mockCall(confirmPasswordReset);
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
    expect(confirmPasswordResetSpy).toHaveBeenCalledWith(resetObject);
  });
});
