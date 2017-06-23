'use strict';

module.exports = function (request, result, firebase) {
  firebase.auth().onAuthStateChanged(function (userlogin) {
    if (userlogin) {
      var groupRef = firebase.database().ref('users/' + userlogin.uid + '/groups/');
      var groups = [];
      groupRef.orderByKey().once('value', function (snapshot) {
        snapshot.forEach(function (childSnapShot) {
          var group = {
            id: childSnapShot.Key,
            groupname: childSnapShot.val().groupName
            // createdby: childSnapShot.val().createdby
          };
          groups.push(group);
        });
        // console.log(snapshot.key);
        // const group = snapshot.val();
      }).then(function () {
        result.send({
          groups: groups
        });
      }).catch(function (error) {
        result.status(500).send({
          message: 'Error occurred ' + error.message
        });
      });
    } else {
      result.status(403).send({
        message: 'Please log in to see a list of your groups'
      });
    }
  });
};