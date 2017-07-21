// import ls from 'local-storage';

module.exports = (request, result, firebase) => {
  const idToken = request.body.idToken;
  const credential = firebase.auth.GoogleAuthProvider.credential(idToken);
// console.log('im in google sigin in');
  firebase.auth().signInWithCredential(credential)
.then((user) => {
  // console.log(user);
  const ref = firebase.database()
        .ref(`users/${user.uid}`);
  ref.once('value')
  .then((snapshot) => {
    if (!snapshot.exists()) {
      firebase.database()
       .ref('users/').child(user.uid).set({
         userName: user.displayName,
         email: user.email,
         phoneNo: ''
       });
    }
  });
  result.send({
    message: `Welcome ${user.email}`,
    user
  });
})
.catch((error) => {
  result.status(500).send({
    message: `Error occured while login in: ${error.message}`
  });
});
};
