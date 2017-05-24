

module.exports = (req, res, firebase) => {
  const email = req.body.email;
  const password = req.body.password;
  const userName = req.body.userName;
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((user) => {
    user.updateProfile({
      displayName: userName,
    }).then(() => {
      // console.log(user);
});
    res.send({
      message: `Welcome ${user.email}`
    });
  }).catch((e) => {
    res.send({
      message: `Error occured ${ e.message}`
    });
  });
};
