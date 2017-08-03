import ls from 'local-storage';

module.exports = (request, result, firebase) => {
  firebase.auth().signOut()
  .then(() => {
    result.send({
      message: 'User successfully signed out.'
    });
    //sessionStorage.clear();
    // ls.remove('authenticated');
  }).catch((error) => {
    result.status(500).send({
      message: `Error occured while signing out :  ${error.message}`
    });
  });
};
