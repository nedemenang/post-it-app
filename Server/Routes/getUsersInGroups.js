module.exports = (request, result, firebase) => {
  firebase.auth().onAuthStateChanged((userlogin) => {
    if (userlogin) {
      const messageRef = firebase.database()
      .ref(`groups/${request.params.groupId}/users/`);
      const users = [];
      messageRef.orderByKey().on('child_added', (snapshot) => {
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
        // console.log(snapshot.key);
        // const group = snapshot.val();
      });
    } else {
      result.status(403).send({
        message: 'Please log in to see a list of your groups'
      });
    }
  });
};

