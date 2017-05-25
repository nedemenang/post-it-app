'use strict';

module.exports = function (request, result, firebase) {
  firebase.auth().onAuthStateChanged(function (userlogin) {
    if (userlogin) {
      var groupRef = firebase.database().ref('groups/' + request.params.groupId + '/users/');
      groupRef.child(request.body.userId).set({
        userId: request.body.userId
      }).then(function () {
        var userRef = firebase.database().ref('users/' + request.body.userId + '/groups/');
        userRef.child(request.params.groupId).set({
          groupId: request.params.groupId
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
        message: 'Only logged users can add users to groups'
      });
    }
  });
};