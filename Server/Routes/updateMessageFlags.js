module.exports = (request, result, firebase) => {
const userlogin = firebase.auth().currentUser;
if (userlogin) {
      const messageRef = firebase.database()
            .ref(`/groups/${request.body.groupId}/messages`)
            .orderByKey().limitToLast(5);
      messageRef.once('value', (snapshot) => {
        snapshot.forEach((childSnapShot) => {
          const isReadCheck = firebase.database()
          .ref(`groups/${request.body.groupId}/messages/${childSnapShot.key}/isRead/${request.body.userId}`);
          isReadCheck.once('value', (snap) => {
            if (snap.val() === null) {
              firebase.database()
              .ref(`groups/${request.body.groupId}/messages/${childSnapShot.key}/isRead`)
              .child(request.body.userId).set({
                email: request.body.email
              });
            }
          });
          const userRef2 = firebase.database()
            .ref(`users/${request.body.userId}/groups/${request.body.groupId}/messages/${childSnapShot.key}`);
            userRef2.once('value', (checkSnap) => {
              if (checkSnap.val() !== null){
                userRef2.update({
                    isRead: true
                });
              }
            });
        });
        const groupRef = firebase.database()
       .ref(`users/${request.body.userId}/groups/${request.body.groupId}/`);
        groupRef.update({
          newMessage: false
        });
      });
  } else {
      result.status(403).send({
        message: 'Error occured, please log in'
      });
    }
};
