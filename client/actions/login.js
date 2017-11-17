import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const login = (user) => {
  AppDispatcher.handleViewAction({
    actionType: AppConstants.LOGIN_USER,
    user
  });
};

export default login;
