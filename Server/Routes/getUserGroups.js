module.exports = (request, result, firebase, io) => {
  const userlogin = firebase.auth().currentUser;
    if (userlogin) {

      const groupRef = firebase.database()
      .ref(`users/${request.params.userId}/groups/`);
      const groups = [];
      groupRef.once('value', (snapshot) => {
        snapshot.forEach((childSnapShot) => {
          const group = {
            groupId: childSnapShot.key,
            groupname: childSnapShot.val().groupName,
            newMessage: childSnapShot.val().newMessage
            // createdby: childSnapShot.val().createdby
          };
          groups.push(group);
        });
        result.send({
          groups,
        });
      });
    } else {
      result.status(403).send({
        message: 'Please log in to see a list of your groups'
      });
    }
};

