module.exports = (request, result, firebase) => {
  firebase.auth().onAuthStateChanged((userlogin) => {
    if (userlogin) {
      const groupRef = firebase.database()
      .ref(`users/${userlogin.uid}/groups/`);
      const groups = [];
      groupRef.orderByKey().on('child_added', (snapshot) => {
        snapshot.forEach((childSnapShot) => {
          const group = {
            id: childSnapShot.key(),
            groupname: childSnapShot.val().groupname,
            createdby: childSnapShot.val().createdby
          };
          groups.push(group);
        })
        .then(() => {
          result.send({
            groups,
          });
        })
        .catch((error) => {
          result.status(500).send({
            message: `Error occurred ${error.message}`,
          });
        });
        // console.log(snapshot.key);
        // const group = snapshot.val();
      });
    } else {
      result.status(403).send({
        message: 'Please log in to see a list of your groups'
      });
    }
  });
};

