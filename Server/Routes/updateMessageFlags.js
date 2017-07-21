module.exports = (request, result, firebase) => {
  firebase.auth().onAuthStateChanged((userlogin) => {
    if (userlogin) {
      const messageRef = firebase.database()
            .ref(`users/${request.body.userId}
            /groups/${request.body.groupId}/messages`)
            .orderByKey().limitToLast(1);
      messageRef.update({
        isRead: true
      });

      const groupRef = firebase.database().ref(`users/${request.body.userId}
      /groups/${request.body.groupId}`);
      groupRef.update({
        newMessage: true
      });
    } else {
      result.status(403).send({
        message: 'Error occured, please log in'
      });
    }
  });
};
