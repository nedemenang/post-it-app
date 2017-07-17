module.exports = (request, result, firebase) => {
  firebase.auth().onAuthStateChanged((userlogin) => {
    if (userlogin) {
      const messageRef = firebase.database()
      .ref(`groups/${request.body.groupId}/messages/`);
      const newkey = messageRef.push({
        messageBody: request.body.messageBody,
        postedBy: request.body.postedBy,
        postedByDisplayName: request.body.postedByDisplayName,
        postedon: request.body.postedon,
        priority: request.body.priority,
        profilePic: request.body.profilePic
      }).key;

      // console.log(`new key is ${newkey}`);
      const userRef = firebase.database()
       .ref(`groups/${request.body.groupId}/users/`);
      userRef.orderByKey().once('value', (snapshot) => {
        snapshot.forEach((childSnapShot) => {
          const userRef2 = firebase.database()
            .ref(`users/${childSnapShot.key}/groups/${request.body.groupId}/messages`);
          userRef2.child(newkey).set({
            messageBody: request.body.messageBody,
            postedBy: request.body.postedBy,
            postedByDisplayName: request.body.postedByDisplayName,
            postedon: request.body.postedon,
            priority: request.body.priority,
            isRead: false,
            profilePic: request.body.profilePic
          });
        });
      })
     .then(() => {
       // update all user profiles with appropriate message. Add isRead flag
       result.send({
         message: 'Message successfully added',
       });
     })
     .catch((error) => {
       result.status(500).send({
         message: `Error occurred ${error.message}`,
       });
     });
    } else {
      result.status(403).send({
        message: 'Only logged users can add messages to groups'
      });
    }
  });
};

