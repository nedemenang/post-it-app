import { login, registerUser,
receiveErrors, receiveSuccess,
updateUserProfile, createGroup,
addMessage, addUserToGroup,
signOutUser, registerGoogleUser,
receiveUserNotInGroupResults, receiveGroupMessages,
receiveUserReadMessages, receiveUserGroups,
receiveAuthenticatedUser, resetPassword,
confirmPasswordReset, selectGroup } from '../actions/AppActions';
import AppConstants from '../constants/AppConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';


jest.mock('axios');
jest.mock('../dispatcher/AppDispatcher');


describe('PostIt Actions', () => {
  let dispatcher;
  beforeEach(() => {
    dispatcher = jest.spyOn(AppDispatcher, 'dispatch');
  });

  afterEach(() => {
    dispatcher.mockReset();
  });

  it('should dispatch a view action of type login users', () => {
    const user = {
      email: 'validEmail@email.com',
      password: 'password',
      isAuthenticated: false,
      profilePic: ''
    };
    login(user);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      actionType: AppConstants.LOGIN_USER,
      user,
    });
  });

  it('should dispatch a view action of type register user users', () => {
    const user = {
      email: 'validemail@gmail.com',
      password: 'password',
      username: 'validemail',
      phoneNo: '+2347039322032',
      profilePic: 'static/files/blank-profile-pic.png'
    };
    registerUser(user);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      actionType: AppConstants.REGISTER_USER,
      user,
    });
  });

  it('should dispatch a view action of type receive error', () => {
    const errors = 'error occured';
    receiveErrors(errors);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      actionType: AppConstants.RECEIVE_ERRORS,
      errors,
    });
  });

  it('should dispatch a view action of type recieve success', () => {
    const message = 'successful operation performed';
    receiveSuccess(message);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      actionType: AppConstants.RECEIVE_SUCCESS,
      message,
    });
  });

  it('should dispatch a view action of type update user', () => {
    const user = {
      userName: 'validuser@email.com',
      phoneNo: '+234701234567',
      profilePic: ''
    };
    updateUserProfile(user);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      actionType: AppConstants.UPDATE_USER_PROFILE,
      user,
    });
  });

  it('should dispatch a view action of type create group', () => {
    const group = {
      groupName: 'Test Group Name',
      dateCreated: '10/17/2017, 4:15:54 PM',
      createdBy: 'validuser@email.com',
      creatorName: 'validuser',
      createdByProfilePic: '',
      creatorId: '-kW3o43WpdoI903dw'
    };
    createGroup(group);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      actionType: AppConstants.CREATE_GROUP,
      group,
    });
  });

  it('should dispatch a view action of type add user to group', () => {
    const user = {
      email: 'validemail@email.com',
      userId: '6BBjJaFIwca6VXZSjmIF2JI8nbv2',
      userName: 'validusername',
      groupId: '-kW3o43WpdoI903dw',
      groupName: 'Valid Group Name'
    };
    addUserToGroup(user);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      actionType: AppConstants.ADDUSER_GROUP,
      user,
    });
  });

  it('should dispatch a view action of type add message', () => {
    const message = {
      messageBody: 'music is life',
      postedOn: '10/17/2017, 4:15:54 PM',
      priority: 'critical',
      postedBy: 'validuser@email.com',
      postedByDisplayName: 'validuser',
      profilePic: '',
      groupId: '-kW3o43WpdoI903dw',
      groupName: 'valid group'
    };
    addMessage(message);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      actionType: AppConstants.ADD_MESSAGE,
      message,
    });
  });

  it('should dispatch a view action of type sign out', () => {
    signOutUser();
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      actionType: AppConstants.SIGNOUT_USER,
    });
  });

  it('should dispatch a view action of type register google user', () => {
    const idToken = '93jdlwlknsi2934DG42o34Fg493kdweire';
    registerGoogleUser(idToken);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      actionType: AppConstants.REGISTER_GOOGLE_USER,
      idToken,
    });
  });

  it('should dispatch a view action of type recieve users not in group', () => {
    const users = [{
      userId: '-kW3o43WpdoI903dw',
      userName: 'User name valid'
    }];
    receiveUserNotInGroupResults(users);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      actionType: AppConstants.RECEIVE_USER_NOT_IN_GROUP_RESULTS,
      users,
    });
  });

  it('should dispatch a view action of type recieve users not in group', () => {
    const messages = [{
      messageBody: 'music is life',
      postedOn: '10/17/2017, 4:15:54 PM',
      priority: 'critical',
      postedBy: 'validuser@email.com',
      postedByDisplayName: 'validuser',
      profilePic: '',
      groupId: '-kW3o43WpdoI903dw',
      groupName: 'valid group'
    }];
    receiveGroupMessages(messages);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      actionType: AppConstants.RECEIVE_MESSAGE_RESULTS,
      messages,
    });
  });

  it('should dispatch a view action of users read messages', () => {
    const usersRead = [{
      email: 'anothervalid@email.com',
    }];
    receiveUserReadMessages(usersRead);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      actionType: AppConstants.RECEIVE_USER_READ_MESSAGES_RESULTS,
      usersRead,
    });
  });

  it('should dispatch a view action of recieve group results', () => {
    const groups = [{
      groupName: 'Test Group Name',
      dateCreated: '10/17/2017, 4:15:54 PM',
      createdBy: 'validuser@email.com',
      creatorName: 'validuser',
      createdByProfilePic: '',
      creatorId: '-kW3o43WpdoI903dw'
    }];
    receiveUserGroups(groups);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      actionType: AppConstants.RECEIVE_GROUP_RESULTS,
      groups,
    });
  });

  it('should dispatch a view action of recieve authenticated user', () => {
    const user = {
      userId: '-kW3o43WpdoI903dw',
      userName: 'User name valid'
    };
    receiveAuthenticatedUser(user);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      actionType: AppConstants.RECEIVE_AUTHENTICATED_USER,
      user,
    });
  });

  it('should dispatch a view action of reset password', () => {
    const emailAddress = 'validemail@gmail.com';
    resetPassword(emailAddress);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      actionType: AppConstants.RESET_PASSWORD,
      emailAddress,
    });
  });

  it('should dispatch a view action of confirm reset password', () => {
    const resetObject = {
      code: '983hdk9834h29837ehe983345r938475ht9345',
      newPassword: 'newPassword'
    };
    confirmPasswordReset(resetObject);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      actionType: AppConstants.CONFIRM_RESET_PASSWORD,
      resetObject,
    });
  });

  it('should dispatch a view action of select group', () => {
    const selectedGroup = {
      groupName: 'Test Group Name',
      groupId: '-ko1eekow3ikdhwoier'
    };
    selectGroup(selectedGroup);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      actionType: AppConstants.SELECT_GROUP,
      selectedGroup,
    });
  });
});
