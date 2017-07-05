//import ls from 'local-storage';

module.exports = (request, result, firebase) => {
  const email = request.body.email;
  const password = request.body.password;
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((user) => {
    result.send({
      message: `Welcome ${user.displayName}`,
      user
    });
   // ls.set('user', user);
   // ls.set('authenticated', true);
   // console.log(ls('user'));
  }).catch((error) => {
    result.status(500).send({
      message: `Error occured while login in:  ${error.message}`
    });
  });
};
