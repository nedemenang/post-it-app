
module.exports = (req, res, firebase) => {
  firebase.auth().onAuthStateChanged((userlogin) => {
    if (userlogin) {
      const newKey = firebase.database().ref('groups/').push({
        groupname: req.body.groupname,
        createdby: userlogin.email,
      }).key;
      const gRef = firebase.database().ref(`groups/${newKey}/users/`);
      gRef.child(userlogin.uid).set({
        userId: userlogin.uid,
      })
     .then(() => {
       const uRef = firebase.database().ref(`users/${userlogin.uid}/groups/`);
       uRef.child(newKey).set({
         groupId: newKey,
        // groupName: req.body.groupname,
       });
       res.send({
         message: 'All operations completed successfully',
       });
     })
     .catch((e) => {
       res.send({
         message: `Error occurred ${e.message}`,
       });
     });
    } else {
      res.send({
        message: 'Only logged users can create groups'
      });
    }
  });
};
