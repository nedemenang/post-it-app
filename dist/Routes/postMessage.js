'use strict';

module.exports = function (request, result, firebase) {
  firebase.auth().onAuthStateChanged(function (userlogin) {
    if (userlogin) {
      var messageRef = firebase.database().ref('groups/' + request.body.groupId + '/messages/');
      messageRef.push({
        message: request.body.message,
        postedBy: userlogin.email,
        postedByDisplayName: userlogin.displayName,
        postedon: request.body.messageDate,
        priority: request.body.priority
        // profilePic: userlogin.profilePic
      }).then(function () {
        // update all user profiles with appropriate message. Add isRead flag
        // const userRef = firebase.database()
        // .ref(`users/${request.body.userId}/groups/`);
        // userRef.child(request.params.groupId).set({
        // groupId: request.params.groupId,
        // });
        result.send({
          message: 'Message successfully added'
        });
      }).catch(function (error) {
        result.status(500).send({
          message: 'Error occurred ' + error.message
        });
      });
    } else {
      result.status(403).send({
        message: 'Only logged users can add messages to groups'
      });
    }
  });
};