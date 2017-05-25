module.exports = (req, res, firebase) => {
  firebase.auth().onAuthStateChanged((userlogin) => {
    if (userlogin) {
      const gRef = firebase.database()
      .ref(`groups/${req.params.groupId}/users/`);
      gRef.child(req.body.userId).set({
        userId: req.body.userId,
      })
     .then(() => {
       const uRef = firebase.database().ref(`users/${req.body.userId}/groups/`);
       uRef.child(req.params.groupId).set({
         groupId: req.params.groupId,
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
        message: 'Only logged users can add users to groups'
      });
    }
  });
};

// const groupRef = db.ref('/groups/' + groupId + '/users');
 //       groupRef.child(newUserId).set({
  //        Id: newUserId,
   //     });
