module.exports = (request, result, firebase, io) => {
  firebase.auth().onAuthStateChanged((userlogin) => {
    if (userlogin) {
      console.log(request.params.groupId);
      const groupRef = firebase.database()
      .ref(`groups/${request.params.groupId}/users/`);
      groupRef.child(request.body.userId).set({
        email: request.body.email,
        userId: request.body.userId,
        userName: request.body.username
      })
     .then(() => {
       const userRef = firebase.database()
       .ref(`users/${request.body.userId}/groups/`);
       userRef.child(request.params.groupId).set({
         groupId: request.params.groupId,
         groupName: request.body.groupName,
         newMessage: false
       });
       const group = {
         groupId: request.params.groupId,
         groupname: request.body.groupName,
         newMessage: false
       };
       io.emit('userAddedToGroup', {
         group
       });
       result.send({
         message: 'User successfully added',
       });
     })
     .catch((error) => {
       result.status(500).send({
         message: `Error occurred ${error.message}`,
       });
     });
    } else {
      result.status(403).send({
        message: 'Only logged users can add users to groups'
      });
    }
  });
};

