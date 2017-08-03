module.exports = (request, result, firebase) => {
  firebase.auth().onAuthStateChanged((userlogin) => {
    if (userlogin) {
      const isReadRef = firebase.database()
          .ref(`groups/${request.params.groupId}/messages/${request.params.messageId}/isRead`);
         // console.log(request.body.groupId);
         // console.log(request.body.messageId);
      const usersRead = [];
      isReadRef.orderByKey()
          .once('value', (snap) => {
            snap.forEach((littleSnap) => {
              const user = {
                id: littleSnap.key,
                email: littleSnap.val().email
              };
              usersRead.push(user);
            });
          }).then(() => {
           // console.log(usersRead);
            result.send({
              usersRead,
            });
          })
        .catch((error) => {
          result.status(500).send({
            message: `Error occurred ${error.message}`,
          });
        });
    } else {
      result.status(403).send({
        message: 'Please log in to see a list of your groups'
      });
    }
  });
};

