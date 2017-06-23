module.exports = (request, result, firebase) => {
  const email = request.body.email;
  const password = request.body.password;
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((user) => {
    result.send({
      message: `Welcome ${user.displayName}`,
      user
    });
  }).catch((error) => {
    result.status(500).send({
      message: `Error occured while login in:  ${error.message}`
    });
  });
};
