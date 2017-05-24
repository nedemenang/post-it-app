


module.exports = (req, res, firebase) => {
  const email = req.body.email;
  const password = req.body.password;
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((user) => {
    res.send({
      message: `Welcome ${user.displayName}`
    });
  }).catch((e) => {
    res.send({
      message: `Error occured while login in:  ${e.message}`
    });
  });
};
