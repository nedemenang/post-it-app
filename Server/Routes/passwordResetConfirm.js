module.exports = (request, result, firebase) => {
  firebase.auth().confirmPasswordReset(request.body.code, request.body.newPassword)
  .then(() => {
    result.send({
      message: 'Password successfully reset.'
    });
  // Email sent.
  }).catch((error) => {
    result.status(500).send({
      message: `Error occured while resetting password:  ${error.message}`
    });
    // An error happened.
  });
};
