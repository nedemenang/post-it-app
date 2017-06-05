module.exports = (request, result, firebase) => {
  firebase.auth().signOut()
  .then(() => {
    result.send({
      message: 'User successfully signed out.'
    });
  }).catch((error) => {
    result.status(500).send({
      message: `Error occured while signing out :  ${error.message}`
    });
  });
};
