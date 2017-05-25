'use strict';

module.exports = function (request, result, firebase) {
  firebase.auth().onAuthStateChanged(function (userlogin) {
    if (userlogin) {
      var newKey = firebase.database().ref('groups/').push({
        groupname: request.body.groupname,
        createdby: userlogin.email
      }).key;
      var groupRef = firebase.database().ref('groups/' + newKey + '/users/');
      groupRef.child(userlogin.uid).set({
        userId: userlogin.uid
      }).then(function () {
        var userRef = firebase.database().ref('users/' + userlogin.uid + '/groups/');
        userRef.child(newKey).set({
          groupId: newKey
        });
        result.send({
          message: 'All operations completed successfully'
        });
      }).catch(function (error) {
        result.send({
          message: 'Error occurred ' + error.message
        });
      });
    } else {
      result.send({
        message: 'Only logged users can create groups'
      });
    }
  });
};