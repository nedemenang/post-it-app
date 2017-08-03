import _ from 'lodash';

module.exports = (request, result, firebase) => {
  firebase.auth().onAuthStateChanged((userlogin) => {
    if (userlogin) {
      const userRef = firebase.database()
      .ref(`groups/${request.params.groupId}/users/`);

      const allUserRef = firebase.database()
      .ref('users');
      const usersInGroup = [];
      const allUsers = [];
      let userNotInGroup = [];
      userRef.orderByKey().once('value', (snapshot) => {
        snapshot.forEach((childSnapShot) => {
          const user = {
            id: childSnapShot.key,
            email: childSnapShot.val().email,
            username: childSnapShot.val().userName,
            profilePic: childSnapShot.val().profilePic
          };
          usersInGroup.push(user);
        });
      });

      allUserRef.orderByKey().once('value', (snapshot) => {
        snapshot.forEach((childSnapShot) => {
          const users = {
            id: childSnapShot.key,
            email: childSnapShot.val().email,
            username: childSnapShot.val().userName,
            profilePic: childSnapShot.val().profilePic
          };
          allUsers.push(users);
        });
        // console.log(usersInGroup);
        // console.log(allUsers);
      }).then(() => {
        userNotInGroup = _.difference(allUsers,
        usersInGroup);
        // console.log(userNotInGroup);
        result.send({
          userNotInGroup,
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

