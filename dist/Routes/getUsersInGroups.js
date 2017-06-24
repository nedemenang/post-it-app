'use strict';

module.exports = function (request, result, firebase) {
  firebase.auth().onAuthStateChanged(function (userlogin) {
    if (userlogin) {
      var messageRef = firebase.database().ref('groups/' + request.params.groupId + '/users/');
      var users = [];
      messageRef.orderByKey().on('child_added', function (snapshot) {
        snapshot.forEach(function (childSnapShot) {
          var user = {
            id: childSnapShot.key(),
            userId: childSnapShot.val().userId
          };
          users.push(user);
        }).then(function () {
          result.send({
            users: users
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