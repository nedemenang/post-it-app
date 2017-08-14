module.exports = (request, result, firebase) => {
  firebase.auth().onAuthStateChanged((userlogin) => {
    if (userlogin) {
      const userRef = firebase.database()
      .ref(`groups/${request.params.groupId}/users/`);
      const users = [];
      userRef.orderByKey().once('value', (snapshot) => {
        snapshot.forEach((childSnapShot) => {
          const user = {
            id: childSnapShot.key(),
            userId: childSnapShot.val().userId,
          };
          users.push(user);
        })
        .then(() => {
          result.send({
            users,
          });
        })
        .catch((error) => {
          result.status(500).send({
            message: `Error occurred ${error.message}`,
          });
        });
      });
    } else {
      result.status(403).send({
        message: 'Please log in to see a list of your groups'
      });
    }
  });
};

