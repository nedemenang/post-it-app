'use strict';

module.exports = function (request, result, firebase) {
  firebase.auth().signOut().then(function () {
    result.send({
      message: 'User successfully signed out.'
    });
  }).catch(function (error) {
    result.status(500).send({
      message: 'Error occured while signing out :  ' + error.message
    });
  });
};