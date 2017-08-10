import _ from 'lodash';

module.exports = (request, result, firebase, io) => {
  const userlogin = firebase.auth().currentUser;
    if (userlogin) {
      const messageRef = firebase.database()
      .ref(`users/${request.params.userId}/groups/${request.params.groupId}/messages/`);
      const ununiquegroupMessages = [];
      let groupMessages = [];
      messageRef.on('value', (snapshot) => {
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
          ununiquegroupMessages.push(message);
        });
        // console.log(groupMessages);
         groupMessages = _.uniqBy(ununiquegroupMessages, 'id');
         io.emit('messageAdded', {
            groupMessages,
            groupId: request.params.groupId,
            userId: request.params.userId
          });
      });
    } else {
      result.status(403).send({
        message: 'Please log in to see a list of your groups'
      });
    }
};

