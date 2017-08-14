module.exports = (firebase, userId, groupId, messageId) => {
const userlogin = firebase.auth().currentUser;
if (userlogin) {
      const firebaseDatabase = firebase.database();
      const isReadRef = firebaseDatabase
          .ref(`groups/${groupId}/messages/${messageId}/isRead/${userId}`);
          isReadRef.once('value', (snap) => {
            if (snap.val() === null) {
              const userEmail = firebaseDatabase
              .ref(`users/${userId}`)
              .once('value', (emailSnap) => {
                firebaseDatabase
                .ref(`groups/${groupId}/messages/${messageId}/isRead`)
                .child(userId).set({
                  email: emailSnap.val().email
                });
              });
            }
          });
          const userRef = firebaseDatabase
            .ref(`users/${userId}/groups/${groupId}/messages/${messageId}`);
            userRef.once('value', (checkSnap) => {
              if (checkSnap.val() !== null){
                userRef.update({
                    isRead: true
                });
              }
            });

        const groupRef = firebaseDatabase
       .ref(`users/${userId}/groups/${groupId}/`);
        groupRef.update({
          newMessage: false
        });
  } else {
      result.status(403).send({
        message: 'Error occured, please log in'
      });
    }
};
