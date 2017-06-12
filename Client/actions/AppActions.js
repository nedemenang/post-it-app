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

  receiveUsers(users) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.RECEIVE_USER_RESULTS,
      users

    });
  },

  receiveErrors(errors) {
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

  receiveLogInError(message) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.RECEIVE_LOGIN_ERRORS,
      message

    });
  }

};

export default AppActions;
