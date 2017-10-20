import axios from 'axios';

// const AppActions = require('../actions/AppActions');
import { receiveErrors, receiveAuthenticatedUser,
  receiveUserGroups, receiveSuccess, receiveUserReadMessages,
  receiveUserInGroupResults,
  receiveUserNotInGroupResults,
  receiveGroupMessages } from '../actions/AppActions';

export const registerNewUser = (user) => {
  axios.post('/users/signup', {
    email: user.email,
    password: user.password,
    userName: user.username,
    photoURL: user.profilePic,
    phoneNo: user.phoneNo
  }).then((response) => {
    const authuser = {
      id: response.data.user.uid,
      email: user.email,
      profilePic: response.data.user.photoURL,
      displayName: response.data.user.displayName,
      phoneNo: response.data.user.phoneNumber,
      isAuthenticated: true
    };
    receiveSuccess(response.data.message);
    receiveAuthenticatedUser(authuser);
    receiveErrors('');
  })
  .catch((error) => {
    receiveErrors(error.message);
  });
};

export const updateUserProfile = (user) => {
  axios.post('/users/updateUserProfile', {
    userName: user.userName,
    photoURL: user.profilePic,
    phoneNo: user.phoneNo
  }).then((response) => {
    receiveSuccess(response.data.message);
    receiveErrors('');
  })
  .catch((error) => {
    receiveErrors(error.message);
  });
};

export const signinUser = (user) => {
  axios.post('/users/signin', {
    email: user.email,
    password: user.password
  }).then((response) => {
    const authuser = {
      id: response.data.user.uid,
      email: user.email,
      profilePic: response.data.user.photoURL,
      displayName: response.data.user.displayName,
      phoneNo: response.data.user.phoneNumber,
      isAuthenticated: true
    };
    receiveSuccess(response.data.message);
    receiveAuthenticatedUser(authuser);
    receiveErrors('');
  })
  .catch((error) => {
    receiveErrors(error.message);
  });
};

export const resetPassword = (emailAddress) => {
  axios.post('/users/passwordReset', {
    emailAddress
  }).then((response) => {
    receiveSuccess(response.data.message);
    receiveErrors('');
  })
    .catch((error) => {
      receiveErrors(error.message);
    });
};

export const confirmResetPassword = (resetObject) => {
  axios.post('/users/confirmPasswordReset', {
    code: resetObject.code,
    newPassword: resetObject.newPassword
  }).then((response) => {
    receiveSuccess(response.data.message);
    receiveErrors('');
  })
    .catch((error) => {
      receiveErrors(error.message);
    });
};

export const signinGoogleUser = (idToken) => {
  axios.post('/users/googleSignin', {
    idToken
  }).then((response) => {
    const authuser = {
      id: response.data.user.uid,
      email: response.data.user.email,
      profilePic: response.data.user.photoURL,
      displayName: response.data.user.displayName,
      isAuthenticated: true
    };
    receiveSuccess(response.data.message);
    receiveAuthenticatedUser(authuser);
    receiveErrors('');
  })
  .catch((error) => {
    receiveErrors(error.message);
  });
};


export const signoutUser = () => {
  axios.post('/users/signout').then((response) => {
    receiveSuccess(response.data.message);
  })
    .catch((error) => {
      receiveErrors(error.message);
    });
};

export const createNewGroup = (group) => {
  axios.post('/group', {
    groupName: group.groupname,
    dateCreated: group.datecreated,
    createdBy: group.createdBy,
    createdByDisplayName: group.createdByDisplayName,
    createdByProfilePic: group.createdByProfilePic,
    createdByUserId: group.createdByUserId
  }).then((response) => {
    receiveSuccess(response.data.message);
  })
    .catch((error) => {
      receiveErrors(error.message);
    });
};

export const addUserToGroup = (user) => {
  axios.post(`/group/${user.groupId}/user`, {
    email: user.email,
    userId: user.userId,
    username: user.username,
    groupName: user.groupName
  }).then((response) => {
    receiveSuccess(response.data.message);
  })
  .catch((error) => {
    receiveErrors(error.message);
  });
};

export const postMessage = (message) => {
  axios.post(`/group/${message.groupId}/message`, {
    groupId: message.groupId,
    messageBody: message.messageBody,
    priority: message.priority,
    postedon: message.postedon,
    postedBy: message.postedBy,
    postedByDisplayName: message.postedByDisplayName,
    profilePic: message.profilePic,
    groupName: message.groupName
  }).then((response) => {
    receiveSuccess(response.data.message);
  })
    .catch((error) => {
      receiveErrors(error.message);
    });
};

export const updateMessageFlag = (updateObject) => {
  axios.post('/group/updateMessageFlag', {
    groupId: updateObject.groupId,
    email: updateObject.email,
    userId: updateObject.userId
  }).then((response) => {
    receiveSuccess(response.data.message);
  })
    .catch((error) => {
      receiveErrors(error.message);
    });
};

export const getUserGroups = (userId) => {
  axios.get(`/user/${userId}/groups`)
   .then((response) => {
     receiveSuccess(response.data.message);
     receiveUserGroups(response.data.groups);
   })
   .catch((error) => {
     receiveErrors(error.message);
   });
};

export const getGroupMessages = (userGroup) => {
  axios.get(`/user/${userGroup.userId}/group/${userGroup.groupId}/messages`);
};

export const getQuickGroupMessages = (userGroup) => {
  axios.get(`/user/${userGroup.userId}/group/${userGroup.groupId}/quickMessages`)
    .then((response) => {
      receiveSuccess(response.data.message);
      receiveGroupMessages(response.data.groupMessages);
    })
   .catch((error) => {
     receiveErrors(error.message);
   });
};

export const getUsersReadMessage = (item) => {
  axios.get(`/group/${item.groupId}/messages/${item.messageId}/usersRead`)
    .then((response) => {
      receiveSuccess(response.data.message);
      receiveUserReadMessages(response.data.usersRead);
    })
   .catch((error) => {
     receiveErrors(error.message);
   });
};

export const getUsersInGroups = (group) => {
  axios.get(`/group/${group.groupId}/users`)
   .then((response) => {
     receiveSuccess(response.data.message);
     receiveUserInGroupResults(response.data.users);
   })
   .catch((error) => {
     receiveErrors(error.message);
   });
};

export const getUsersNotInGroups = (group) => {
  axios.get(`/group/${group.groupId}/notusers`)
   .then((response) => {
     receiveSuccess(response.data.message);
     receiveUserNotInGroupResults(response.data.userNotInGroup);
   })
   .catch((error) => {
     receiveErrors(error.message);
   });
};

