'use strict';

module.exports = function (request, result, firebase) {
  firebase.auth().onAuthStateChanged(function (userlogin) {
    if (userlogin) {
      var messageRef = firebase.database().ref('groups/' + request.params.groupId + '/messages/');
      var groupMessages = [];
      messageRef.orderByKey().on('child_added', function (snapshot) {
        snapshot.forEach(function (childSnapShot) {
          var message = {
            id: childSnapShot.key,
            message: childSnapShot.val().groupname,
            postedby: childSnapShot.val().postedby,
            postedon: childSnapShot.val().postedon,
            priority: childSnapShot.val().priority
          };
          groupMessages.push(message);
        }).then(function () {
          result.send({
            groupMessages: groupMessages
          });
        }).catch(function (error) {
          result.status(500).send({
            message: 'Error occurred ' + error.message
          });
        });
        // console.log(snapshot.key);
        // const group = snapshot.val();
      });
    } else {
      result.status(403).send({
        message: 'Please log in to see a list of your groups'
      });
    }
  });
};