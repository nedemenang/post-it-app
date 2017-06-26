import axios from 'axios';

// const AppActions = require('../actions/AppActions');
import AppActions from '../actions/AppActions';

module.exports = {
  registerNewUser(user) {
    console.log(user);
    axios.post('/users/signup', {
      email: user.email,
      password: user.password,
      userName: user.username
    }).then((response) => {
      // console.log(response.data.message);
      AppActions.receiveSuccess(response.data.message);
    })
  .catch((error) => {
    AppActions.receiveErrors(error.message);
  });
  },

  signinUser(user) {
   // console.log(user);
    axios.post('/users/signin', {
      email: user.email,
      password: user.password
    }).then((response) => {
      // console.log(response);
      const authuser = {
        id: response.data.user.uid,
        email: user.email,
        profilePic: response.data.user.photoURL,
        isAuthenticated: true
      };
      AppActions.receiveSuccess(response.message);
      AppActions.receiveAuthenticatedUser(authuser);
      console.log(authuser);
    })
  .catch((error) => {
    AppActions.receiveErrors(error);
    console.log(error);
    // console.log(user);
  });
  },

  signoutUser(user) {
    axios.post('/users/signout', {
      userId: user.userId
    }).then((response) => {
      AppActions.receiveSuccess(response.message);
    })
    .catch((error) => {
      AppActions.receiveErrors(error.message);
    });
  },

  createNewGroup(group) {
    console.log(group);
    axios.post('/group', {
      groupName: group.groupname,
      dateCreated: group.datecreated
    }).then((response) => {
      console.log('create group success');
      AppActions.receiveSuccess(response.message);
    })
    .catch((error) => {
      console.log('create group error');
      AppActions.receiveErrors(error.message);
    });
  },

  addUserToGroup(userGroup) {
    axios.post(`/group/${userGroup.groupId}/user`, {
      userId: userGroup.userId
    }).then((response) => {
      AppActions.receiveSuccess(response.message);
      console.log(response);
    })
  .catch((error) => {
    AppActions.receiveErrors(error.message);
    console.log(error);
  });
    // console.log('Adding user to group....');
  },

  postMessage(message) {
    // console.log(message);
    axios.post(`/group/${message.groupId}/message`, {
      groupId: message.groupId,
      messageBody: message.messageBody,
      priority: message.priority,
      postedon: message.postedon
    }).then((response) => {
      AppActions.receiveSuccess(response.message);
    })
    .catch((error) => {
      AppActions.receiveErrors(error.message);
    });
  },

  getUserGroups() {
    console.log('getting group info...');
    axios.get('user/groups')
   .then((response) => {
     console.log(response);
     AppActions.receiveSuccess(response.message);
     AppActions.receiveUserGroups(response.data.groups);
   })
   .catch((error) => {
     AppActions.receiveErrors(error.message);
   });
  },

  getGroupMessages(group) {
    axios.get(`/group/${group.groupId}/messages`)
    .then((response) => {
      // console.log(response);
      AppActions.receiveSuccess(response.message);
      AppActions.receiveGroupMessages(response.data.groupMessages);
    })
   .catch((error) => {
     AppActions.receiveErrors(error.message);
   });
  },

  getUsersInGroups(group) {
    axios.get(`group/${group.groupId}/users`)
   .then((response) => {
     AppActions.receiveSuccess(response.message);
     AppActions.receiveUserInGroupResults(response.users);
   })
   .catch((error) => {
     AppActions.receiveErrors(error.message);
   });
  },

  getUsersNotInGroups(group) {
    axios.get('group/notusers', {
      params: {
        groupId: group.groupId
      }
    })
   .then((response) => {
     AppActions.receiveSuccess(response.message);
     AppActions.receiveUserNotInGroupResults(response.users);
   })
   .catch((error) => {
     AppActions.receiveErrors(error.message);
   });
  }
};
