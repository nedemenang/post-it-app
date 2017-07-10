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
        displayName: response.data.user.displayName,
        isAuthenticated: true
      };
      AppActions.receiveSuccess(response.message);
      AppActions.receiveAuthenticatedUser(authuser);
      AppActions.receiveErrors('');
      // console.log(authuser);
    })
  .catch((error) => {
    AppActions.receiveErrors(error.message);
    // console.log(error);
    // console.log(user);
    });
  },

signinGoogleUser(idToken) {
   // console.log(user);
    axios.post('/users/googleSignin', {
      idToken: idToken
    }).then((response) => {
      // console.log(response);
      const authuser = {
        id: response.data.user.uid,
        email: response.data.user.email,
        profilePic: response.data.user.photoURL,
        displayName: response.data.user.displayName,
        isAuthenticated: true
      };
      AppActions.receiveSuccess(response.message);
      AppActions.receiveAuthenticatedUser(authuser);
      AppActions.receiveErrors('');
     // console.log(authuser);
    })
  .catch((error) => {
    AppActions.receiveErrors(error.message);
    // console.log(error);
    // console.log(user);
  });
  },


  signoutUser() {
    axios.post('/users/signout').then((response) => {
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

  addUserToGroup(user) {
    axios.post(`/group/${user.groupId}/user`, {
      email: user.email,
      userId: user.userId,
      username: user.username,
      groupName: user.groupName
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
      postedon: message.postedon,
      postedBy: message.postedBy,
      postedByDisplayName: message.postedByDisplayName
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
    console.log(group);
    axios.get(`group/${group.groupId}/notusers`)
   .then((response) => {
     AppActions.receiveSuccess(response.message);
     AppActions.receiveUserNotInGroupResults(response.data.userNotInGroup);
   })
   .catch((error) => {
     AppActions.receiveErrors(error.message);
   });
  }
};
