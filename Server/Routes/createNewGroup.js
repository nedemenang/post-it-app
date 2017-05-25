
module.exports = (req, res, firebase) => {
  firebase.auth().onAuthStateChanged((userlogin) => {
    if (userlogin) {
      const newKey = firebase.database().ref('groups/').push({
        groupname: req.body.groupname,
        createdby: userlogin.email,
      }).key;
      firebase.database().ref(`groups/${newKey}`).child('users').push({
        userId: userlogin.uid,
      })
     .then(() => {
       firebase.database().ref(`users/${userlogin.uid}`).child('groups').push({
         groupId: newKey,
         groupName: req.body.groupname,
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
