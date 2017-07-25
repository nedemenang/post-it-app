module.exports = (request, result, firebase) => {
  firebase.auth().onAuthStateChanged((userlogin) => {
    if (userlogin) {
      const groupRef = firebase.database()
      .ref(`users/${userlogin.uid}/groups/`);
      const groups = [];
      groupRef.orderByKey().once('value', (snapshot) => {
        snapshot.forEach((childSnapShot) => {
          const group = {
            groupId: childSnapShot.key,
            groupname: childSnapShot.val().groupName,
            newMessage: false
            // createdby: childSnapShot.val().createdby
          };
          const newMessageCheck = firebase.database()
          .ref(`groups/${childSnapShot.key}/messages`).limitToLast(1);
          newMessageCheck.on('value', (snap) => {
            if (snap.val() !== null) {
              const isReadCheck = firebase.database()
              .ref(`groups/${request.params.groupId}/messages/${snap.key}/isRead/${userlogin.uid}`);
              isReadCheck.once('value', (check) => {
                if (check.val() === null) {
                  group.newMessage = true;
                }
              });
            }
          });
          groups.push(group);
        });
      }).then(() => {
        result.send({
          groups,
        });
      })
        .catch((error) => {
          result.status(500).send({
            message: `Error occurred ${error.message}`,
          });
        });
    } else {
      result.status(403).send({
        message: 'Please log in to see a list of your groups'
      });
    }
  });
};

