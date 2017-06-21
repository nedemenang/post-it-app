import axios from 'axios';

// const AppActions = require('../actions/AppActions');
import AppActions from '../actions/AppActions';

module.exports = {
  registerNewUser(user) {
    axios.post('/users/signup', {
      email: user.email,
      password: user.password,
      userName: user.username
    }).then((response) => {
      AppActions.receiveSuccess(response.message);
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
      AppActions.receiveSuccess(response.message);
      // console.log(response.status);
    })
  .catch((error) => {
    AppActions.receiveErrors(error.message);
    // console.log('receiveErrors');
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
    axios.post('/group', {
      groupName: group.groupname,
      createdyBy: group.createdby,
      dateCreated: group.datecreated
    }).then((response) => {
      AppActions.receiveSuccess(response.message);
    })
    .catch((error) => {
      AppActions.receiveErrors(error.message);
    });
  },

  addUserToGroup(userGroup) {
    axios.post(`/group/${userGroup.groupId}/user`, {
      userId: userGroup.userId
    }).then((response) => {
      AppActions.receiveSuccess(response.message);
      // console.log(response);
    })
  .catch((error) => {
    AppActions.receiveErrors(error.message);
    // console.log(error);
  });
    // console.log('Adding user to group....');
  },

  postMessage(message) {
    axios.post(`/group/${message.groupId}/addmessage`, {
      groupId: message.groupId,
      messageBody: message.messagebody,
      postedBy: message.postedby,
      priority: message.priority
    }).then((response) => {
      AppActions.receiveSuccess(response.message);
    })
    .catch((error) => {
      AppActions.receiveErrors(error.message);
    });
  },

  getUserGroups(user) {
    // console.log('getting group info...');
    axios.get('user/groups', {
      params: {
        userId: user.userId
      }
    })
   .then((response) => {
     AppActions.receiveSuccess(response.message);
     AppActions.receiveUserGroups(response.groups);
   })
   .catch((error) => {
     AppActions.receiveErrors(error.message);
   });
  },

  getGroupMessages(group) {
    axios.get('group/messages', {
      params: {
        groupId: group.groupId
      }
    })
   .then((response) => {
     AppActions.receiveSuccess(response.message);
     AppActions.receiveGroupMessages(response.messages);
   })
   .catch((error) => {
     AppActions.receiveErrors(error.message);
   });
  },

  getUsersInGroups(group) {
    axios.get('group/users', {
      params: {
        groupId: group.groupId
      }
    })
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
