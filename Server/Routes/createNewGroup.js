module.exports = (request, result, firebase, io) => {
  firebase.auth().onAuthStateChanged((userlogin) => {
    if (userlogin) {
      const newKey = firebase.database().ref('groups/').push({
        groupName: request.body.groupName,
        createdBy: userlogin.email,
        dateCreated: request.body.dateCreated
      }).key;
      const groupRef = firebase.database().ref(`groups/${newKey}/users/`);
      groupRef.child(userlogin.uid).set({
        userId: userlogin.uid,
        email: userlogin.email,
        userName: userlogin.displayName
      })
     .then(() => {
       const userRef = firebase.database()
       .ref(`users/${userlogin.uid}/groups/`);
       userRef.child(newKey).set({
         groupId: newKey,
         groupName: request.body.groupName,
         newMessage: false
       });
       const group = {
         groupId: newKey,
         groupName: request.body.groupName,
         newMessage: false
       };
       io.emit('groupCreated', {
         group
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
  });
};
