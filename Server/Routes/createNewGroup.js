module.exports = (request, result, firebase, io) => {
  const userlogin = firebase.auth().currentUser;
    if (userlogin) {
      const requestBody = request.body;
      const firebaseDatabase = firebase.database();
      const newKey = firebaseDatabase.ref('groups/').push({
        groupName: requestBody.groupName,
        createdBy: requestBody.createdBy,
        dateCreated: requestBody.dateCreated
      }).key;
      const groupRef = firebaseDatabase.ref(`groups/${newKey}/users/`);
      groupRef.child(requestBody.createdByUserId).set({
        userId: requestBody.createdByUserId,
        email: requestBody.createdBy,
        userName: requestBody.createdByDisplayName
      })
     .then(() => {
       const userRef = firebaseDatabase
       .ref(`users/${requestBody.createdByUserId}/groups/`);
       userRef.child(newKey).set({
         groupId: newKey,
         groupName: requestBody.groupName,
         newMessage: false
       });
       result.send({
         message: 'New group successfully created',
       });
     })
     .catch((error) => {
       result.status(500).send({
         message: `Error occurred ${error.message}`,
       });
     });
  } else {
      result.status(403).send({
        message: 'Only logged users can create groups'
      });
    }
};
