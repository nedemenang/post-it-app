import sendSMS from './sendSms';
import sendEmail from './sendMail';

module.exports = (request, result, firebase, io) => {
  firebase.auth().onAuthStateChanged((userlogin) => {
    if (userlogin) {
       // console.log(`group Id ${request.body.groupId}`);
      const messageRef = firebase.database()
       .ref(`groups/${request.body.groupId}/messages`);
      const newkey = messageRef.push({
        messageBody: request.body.messageBody,
        postedBy: request.body.postedBy,
        postedByDisplayName: request.body.postedByDisplayName,
        postedon: request.body.postedon,
        priority: request.body.priority,
        profilePic: request.body.profilePic
      }).key;
      const userRef = firebase.database()
       .ref(`groups/${request.body.groupId}/users`);
      userRef.orderByKey().once('value', (snapshot) => {
        snapshot.forEach((childSnapShot) => {
          const groupRef = firebase.database()
          .ref(`users/${childSnapShot.key}/groups`);
          groupRef.update({
            newMessage: true
          });
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

          if (request.body.priority === 'critical') {
            const phoneRef = firebase.database()
            .ref(`users/${childSnapShot.key}`);
            phoneRef.once('value', (record) => {
              if (record.val().phoneNo !== '') {
                const smsObject = {
                  phoneNo: record.val().phoneNo,
                  groupName: request.body.groupName
                };
                sendSMS(smsObject);
              }
            });
          }
          if (request.body.priority === 'critical' ||
            request.body.priority === 'urgent') {
            const emailRef = firebase.database()
            .ref(`users/${childSnapShot.key}`);
            emailRef.once('value', (record) => {
              const emailObject = {
                To: record.val().email,
                groupName: request.body.groupName
              };
              // console.log(emailObject);
              sendEmail(emailObject);
            });
          }
        });
      })
     .then(() => {
       const group = {
         groupId: request.body.groupId,
         groupname: request.body.groupName,
         newMessage: true
       };
       io.emit('messageAdded', {
         group
       });
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

