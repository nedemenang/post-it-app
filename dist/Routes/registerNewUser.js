"use strict";

module.exports = function (request, result, firebase) {
  //console.log('registering user...');
  var email = request.body.email;
  var password = request.body.password;
  var userName = request.body.userName;
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function (user) {
    user.updateProfile({
      displayName: userName
    }).then(function () {
      result.send({
        message: "Welcome " + user.email + ". Please proceed to log in"
      });
    });
  }).catch(function (error) {
    result.status(500).send({
      message: "Error occured " + error.message
    });
  });
};