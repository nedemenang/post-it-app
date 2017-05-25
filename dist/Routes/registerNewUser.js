"use strict";

module.exports = function (request, result, firebase) {
  var email = request.body.email;
  var password = request.body.password;
  var userName = request.body.userName;
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function (user) {
    user.updateProfile({
      displayName: userName
    }).then(function () {
      result.send({
        message: "Welcome " + user.email
      });
    });
  }).catch(function (e) {
    result.send({
      message: "Error occured " + e.message
    });
  });
};