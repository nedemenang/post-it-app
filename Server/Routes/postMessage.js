import sendSMS from './sendSms';
import sendEmail from './sendMail';

module.exports = (request, result, firebase, io) => {
  const userlogin = firebase.auth().currentUser;
  if (userlogin) {
      const requestBody = request.body;
      const firebaseDatabase = firebase.database();
      const subscribers = [];
      const messageRef = firebaseDatabase
       .ref(`groups/${requestBody.groupId}/messages`);
      const newkey = messageRef.push({
        messageBody: requestBody.messageBody,
        postedBy: requestBody.postedBy,
        postedByDisplayName: requestBody.postedByDisplayName,
        postedon: requestBody.postedon,
        priority: requestBody.priority,
        profilePic: requestBody.profilePic
      }).key;
      const userRef = firebaseDatabase
       .ref(`groups/${requestBody.groupId}/users`);
      userRef.orderByKey().once('value', (snapshot) => {
        snapshot.forEach((childSnapShot) => {
          const groupRef = firebaseDatabase
          .ref(`users/${childSnapShot.key}/groups/${requestBody.groupId}`);
          groupRef.update({
            newMessage: true
          });
          const userRef2 = firebaseDatabase
            .ref(`users/${childSnapShot.key}/groups/${requestBody.groupId}/messages`);
          userRef2.child(newkey).set({
            messageBody: requestBody.messageBody,
            postedBy: requestBody.postedBy,
            postedByDisplayName: requestBody.postedByDisplayName,
            postedon: requestBody.postedon,
            priority: requestBody.priority,
            isRead: false,
            profilePic: requestBody.profilePic
          });

          if (requestBody.priority === 'critical') {
            const phoneRef = firebaseDatabase
            .ref(`users/${childSnapShot.key}`);
            phoneRef.once('value', (record) => {
              if (record.val().phoneNo !== '') {
                const smsObject = {
                  phoneNo: record.val().phoneNo,
                  groupName: requestBody.groupName
                };
                sendSMS(smsObject);
              }
            });
          }
          if (requestBody.priority === 'critical' ||
            requestBody.priority === 'urgent') {
            const emailRef = firebaseDatabase
            .ref(`users/${childSnapShot.key}`);
            emailRef.once('value', (record) => {
              const emailObject = {
                To: record.val().email,
                groupName: requestBody.groupName
              };
              sendEmail(emailObject);
            });
          }
          subscribers.push(childSnapShot.key);
        });
        io.emit('messageBroadcast', {
            subscribers,
            groupName : requestBody.groupName,
            postedBy : requestBody.postedBy
          });
      })
     .then(() => {
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
};

