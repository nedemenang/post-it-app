'use strict';

module.exports = function (request, result, firebase) {
  firebase.auth().onAuthStateChanged(function (userlogin) {
    if (userlogin) {
      var newKey = firebase.database().ref('groups/').push({
        groupName: request.body.groupName,
        createdBy: userlogin.email,
        dateCreated: request.body.dateCreated
      }).key;
      var groupRef = firebase.database().ref('groups/' + newKey + '/users/');
      groupRef.child(userlogin.uid).set({
        userId: userlogin.uid
      }).then(function () {
        var userRef = firebase.database().ref('users/' + userlogin.uid + '/groups/');
        userRef.child(newKey).set({
          groupId: newKey,
          groupName: request.body.groupName
        });
        result.send({
          message: 'New group successfully created'
        });
      }).catch(function (error) {
        result.status(500).send({
          message: 'Error occurred ' + error.message
        });
      });
    } else {
      result.status(403).send({
        message: 'Only logged users can create groups'
      });
    }
  });
};