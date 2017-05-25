module.exports = (request, result, firebase) => {
  firebase.auth().onAuthStateChanged((userlogin) => {
    if (userlogin) {
      const newKey = firebase.database().ref('groups/').push({
        groupname: request.body.groupname,
        createdby: userlogin.email,
      }).key;
      const groupRef = firebase.database().ref(`groups/${newKey}/users/`);
      groupRef.child(userlogin.uid).set({
        userId: userlogin.uid,
      })
     .then(() => {
       const userRef = firebase.database()
       .ref(`users/${userlogin.uid}/groups/`);
       userRef.child(newKey).set({
         groupId: newKey,
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
        message: 'Only logged users can create groups'
      });
    }
  });
};
