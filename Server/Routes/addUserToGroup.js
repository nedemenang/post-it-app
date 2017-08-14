module.exports = (request, result, firebase, io) => {
  firebase.auth().onAuthStateChanged((userlogin) => {
    if (userlogin) {
      const requestBody = request.body;
      const firebaseDatabase = firebase.database();
      const requestParams = request.params;
      const groupRef = firebaseDatabase
      .ref(`groups/${requestParams.groupId}/users/`);
      groupRef.child(requestBody.userId).set({
        email: requestBody.email,
        userId: requestBody.userId,
        userName: requestBody.username
      })
     .then(() => {
       const userRef = firebaseDatabase
       .ref(`users/${requestBody.userId}/groups/`);
       userRef.child(requestParams.groupId).set({
         groupId: requestParams.groupId,
         groupName: requestBody.groupName,
         newMessage: false
       });
       const group = {
         groupId: requestParams.groupId,
         groupname: requestBody.groupName,
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

