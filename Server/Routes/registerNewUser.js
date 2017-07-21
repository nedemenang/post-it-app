module.exports = (request, result, firebase, io) => {
  // console.log('registering user...');
  const email = request.body.email;
  const password = request.body.password;
  const userName = request.body.userName;
  const photo = request.body.photoURL;
  const phoneNo = request.body.phoneNo;
  // console.log(phoneNo);
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((user) => {
    user.updateProfile({
      displayName: userName,
      photoURL: photo,
      phoneNumber: phoneNo
    }).then(() => {
      const userRef = firebase.database()
       .ref('users/');
      userRef.child(user.uid).set({
        userName,
        email,
        phoneNo
      });
      io.emit('userAdded', {});
      firebase.auth().signInWithEmailAndPassword(email, password)
      .catch((error) => {
        result.status(500).send({
          message: `Error occured ${error.message}`
        });
      });
      result.send({
        message: `Welcome ${user.email}. Please proceed to log in`,
        user
      });
    });
  }).catch((error) => {
    result.status(500).send({
      message: `Error occured ${error.message}`
    });
  });
};
