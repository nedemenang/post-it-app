module.exports = (request, result, firebase) => {
  firebase.auth().onAuthStateChanged((userlogin) => {
    if (userlogin) {
      const messageRef = firebase.database()
            .ref(`/groups/${request.body.groupId}/messages`)
            .orderByKey().limitToLast(5);
      messageRef.orderByKey().once('value', (snapshot) => {
        snapshot.forEach((childSnapShot) => {
          const isReadCheck = firebase.database()
          .ref(`groups/${request.body.groupId}/messages/${childSnapShot.key}/isRead/${userlogin.uid}`);
          isReadCheck.once('value', (snap) => {
            if (snap.val() === null) {
              firebase.database()
              .ref(`groups/${request.body.groupId}/messages/${childSnapShot.key}/isRead`)
              .child(userlogin.uid).set({
                email: userlogin.email
              });
            }
          });
        });
      });
    } else {
      result.status(403).send({
        message: 'Error occured, please log in'
      });
    }
  });
};
