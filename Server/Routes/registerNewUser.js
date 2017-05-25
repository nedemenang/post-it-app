module.exports = (request, result, firebase) => {
  const email = request.body.email;
  const password = request.body.password;
  const userName = request.body.userName;
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((user) => {
    user.updateProfile({
      displayName: userName,
    }).then(() => {
      result.send({
        message: `Welcome ${user.email}`
      });
    });
  }).catch((e) => {
    result.send({
      message: `Error occured ${e.message}`
    });
  });
};
