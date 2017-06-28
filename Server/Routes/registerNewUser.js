module.exports = (request, result, firebase) => {
  // console.log('registering user...');
  const email = request.body.email;
  const password = request.body.password;
  const userName = request.body.userName;
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((user) => {
    user.updateProfile({
      displayName: userName,
    }).then(() => {
      const userRef = firebase.database()
       .ref(`users/`);
      userRef.child(user.uid).set({
        userName,
        email
      });
      result.send({
        message: `Welcome ${user.email}. Please proceed to log in`
      });
    });
  }).catch((error) => {
    result.status(500).send({
      message: `Error occured ${error.message}`
    });
  });
};
