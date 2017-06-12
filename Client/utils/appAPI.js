import axios from 'axios';

// const AppActions = require('../actions/AppActions');
import * as AppActions from '../actions/AppActions';

module.exports = {
  registerNewUser(user) {
    axios.post('/users/signup', {
      email: user.email,
      password: user.password,
      userName: user.username
    }).then((response) => {
      AppActions.receiveSuccess(response.message);
      console.log(response.status);
    })
  .catch((error) => {
    AppActions.receiveErrors(error);
    console.log(error.status);
  });
  },

  getGroupInfo() {
    const group = [];
    console.log('getting group info...');
    // axios.get('/user', {
      // params: {
     //   ID: 12345
    //  }
   // })
  // .then((response) => {
   // console.log(response);
  // })
  // .catch((error) => {
   // console.log(error);
  // });
  },

  getUserGroups() {
    const userGroup = [];
    console.log('getting user groups...');
  },

  getGroupMessages() {
    const messages = [];
    console.log('getting user group messages...');
  },

  getUsers() {
    const users = [];
    console.log('getting user....');

    // AppActions.receiveUsers(users);
  },

  signinUser(user) {
    console.log(user);
    axios.post('/users/signin', {
      email: user.email,
      password: user.password
    }).then((response) => {
      AppActions.receiveSuccess(response.message);
      console.log(response.status);
    })
  .catch((error) => {
    AppActions.receiveErrors(error);
    console.log(error.message);
  });
  },

  addUserToGroup(userGroup) {
    axios.post(`/group/${userGroup.groupId}/user`, {
      userGroup
    }).then((response) => {
      AppActions.receiveSuccess(response.message);
      console.log(response);
    })
  .catch((error) => {
    AppActions.receiveErrors(error);
    console.log(error);
  });
    console.log('Adding user to group....');
  },

  createNewGroup() {
    console.log('Creating new group....');
  },
  postMessage() {
    console.log('posting message....');
  },

  signoutUser() {
    console.log('signing out user....');
  },
};
