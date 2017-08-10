module.exports = (request, result, firebase, io) => {
  const userlogin = firebase.auth().currentUser;
    if (userlogin) {
      const newKey = firebase.database().ref('groups/').push({
        groupName: request.body.groupName,
        createdBy: request.body.createdBy,
        dateCreated: request.body.dateCreated
      }).key;
      const groupRef = firebase.database().ref(`groups/${newKey}/users/`);
      groupRef.child(request.body.createdByUserId).set({
        userId: request.body.createdByUserId,
        email: request.body.createdBy,
        userName: request.body.createdByDisplayName
      })
     .then(() => {
       const userRef = firebase.database()
       .ref(`users/${request.body.createdByUserId}/groups/`);
       userRef.child(newKey).set({
         groupId: newKey,
         groupName: request.body.groupName,
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
