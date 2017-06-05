"use strict";

module.exports = function (request, result, firebase) {
  var email = request.body.email;
  var password = request.body.password;
  firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) {
    result.send({
      message: "Welcome " + user.displayName
    });
  }).catch(function (error) {
    result.status(500).send({
      message: "Error occured while login in:  " + error.message
    });
  });
};