module.exports = (request, result, firebase) => {
  firebase.auth().onAuthStateChanged((userlogin) => {
    if (userlogin) {
      const messageRef = firebase.database()
      .ref(`groups/${request.params.groupId}/messages/`);
      const groupMessages = [];
      messageRef.orderByKey().on('child_added', (snapshot) => {
        snapshot.forEach((childSnapShot) => {
          const message = {
            id: childSnapShot.key,
            message: childSnapShot.val().groupname,
            postedby: childSnapShot.val().postedby,
            postedon: childSnapShot.val().postedon,
            priority: childSnapShot.val().priority
          };
          groupMessages.push(message);
        })
        .then(() => {
          result.send({
            groupMessages,
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

