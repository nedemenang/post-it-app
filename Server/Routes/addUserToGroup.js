module.exports = (request, result, firebase) => {
  firebase.auth().onAuthStateChanged((userlogin) => {
    if (userlogin) {
      const groupRef = firebase.database()
      .ref(`groups/${request.params.groupId}/users/`);
      groupRef.child(request.body.userId).set({
        userId: request.body.userId,
      })
     .then(() => {
       const userRef = firebase.database()
       .ref(`users/${request.body.userId}/groups/`);
       userRef.child(request.params.groupId).set({
         groupId: request.params.groupId,
       });
       result.send({
         message: 'All operations completed successfully',
       });
     })
     .catch((error) => {
       result.send({
         message: `Error occurred ${error.message}`,
       });
     });
    } else {
      result.send({
        message: 'Only logged users can add users to groups'
      });
    }
  });
};

