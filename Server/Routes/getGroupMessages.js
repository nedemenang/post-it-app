import _ from 'lodash';
import updateFlags from './updateMessageFlags';

module.exports = (request, result, firebase, io) => {
  const userlogin = firebase.auth().currentUser;
    if (userlogin) {
      const firebaseDatabase = firebase.database();
      const requestParams = request.params;
      const messageRef = firebaseDatabase
      .ref(`users/${requestParams.userId}/groups/${requestParams.groupId}/messages/`);
      const ununiquegroupMessages = [];
      let groupMessages = [];
      messageRef.orderByKey().limitToLast(8).on('value', (snapshot) => {
        snapshot.forEach((childSnapShot) => {
          const values = childSnapShot.val();
          const message = {
            id: childSnapShot.key,
            messageBody: values.messageBody,
            postedBy: values.postedBy,
            postedByDisplayName: values.postedByDisplayName,
            profilePic: values.profilePic,
            postedon: values.postedon,
            priority: values.priority,
            isRead: values.isRead,
          };
          ununiquegroupMessages.push(message);
          updateFlags(firebase, requestParams.userId, requestParams.groupId, childSnapShot.key);
        });
         groupMessages = _.uniqBy(ununiquegroupMessages, 'id');
         // console.log('groupMessages');
         
         io.emit('messageAdded', {
            groupMessages,
            groupId: requestParams.groupId,
            userId: requestParams.userId
          });
      });
    } else {
      result.status(403).send({
        message: 'Please log in to see a list of your groups'
      });
    }
};

