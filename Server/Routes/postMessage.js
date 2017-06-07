module.exports = (request, result, firebase) => {
  firebase.auth().onAuthStateChanged((userlogin) => {
    if (userlogin) {
      const groupRef = firebase.database()
      .ref(`groups/${request.params.groupId}/messages/`);
      groupRef.child(request.body.userId).set({
        message: request.body.message,
        postedBy: request.body.username,
        postedon: request.body.messageDate
      })
     .then(() => {
       // update all user profiles with appropriate message. Add isRead flag
      // const userRef = firebase.database()
      // .ref(`users/${request.body.userId}/groups/`);
      // userRef.child(request.params.groupId).set({
        // groupId: request.params.groupId,
       // });
      // result.send({
      //   message: 'Message successfully added',
     //  });
     })
     .catch((error) => {
       result.status(500).send({
         message: `Error occurred ${error.message}`,
       });
     });
    } else {
      result.status(403).send({
        message: 'Only logged users can add messages to groups'
      });
    }
  });
};

