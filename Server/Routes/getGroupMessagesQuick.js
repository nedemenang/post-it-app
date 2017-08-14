import _ from 'lodash';

module.exports = (request, result, firebase, io) => {
  const userlogin = firebase.auth().currentUser;
    if (userlogin) {
      const messageRef = firebase.database()
      .ref(`users/${request.params.userId}/groups/${request.params.groupId}/messages/`);
      let groupMessages = [];
      messageRef.orderByKey().limitToLast(8).once('value', (snapshot) => {
        snapshot.forEach((childSnapShot) => {
          const message = {
            id: childSnapShot.key,
            messageBody: childSnapShot.val().messageBody,
            postedBy: childSnapShot.val().postedBy,
            postedByDisplayName: childSnapShot.val().postedByDisplayName,
            profilePic: childSnapShot.val().profilePic,
            postedon: childSnapShot.val().postedon,
            priority: childSnapShot.val().priority,
            isRead: childSnapShot.val().isRead,
          };
          groupMessages.push(message);
        });
         result.send({
            groupMessages,
          });
      });
    } else {
      result.status(403).send({
        message: 'Please log in to see a list of your groups'
      });
    }
};

