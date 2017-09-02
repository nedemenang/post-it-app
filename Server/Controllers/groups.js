import lodash from 'lodash';
import sendSMS from '../Utilities/sendSms';
import sendEmail from '../Utilities/sendMail';

export default {

/**
   * Update message flags
   * Route: GET: /group/updateMessageFlag
   * @param {Object} firebase firebase object
   * @param {string} userId user Id string
   * @param {string} groupId groupId string
   * @param {string} messageId messageId string
   * @returns {void} no returns
   */
  updateMessageFlag(firebase, userId, groupId, messageId) {
    const userlogin = firebase.auth().currentUser;
    if (userlogin) {
      const firebaseDatabase = firebase.database();
      const isReadRef = firebaseDatabase
              .ref(`groups/${groupId}/messages/${messageId}/isRead/${userId}`);
      isReadRef.once('value', (snap) => {
        if (snap.val() === null) {
          firebaseDatabase
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
        if (checkSnap.val() !== null) {
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
    }
  },

  /**
   * Create new group
   * Route: POST: /group
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {firebase} firebase firebase object
   * @returns {Response} response object
   */
  create(req, res, firebase) {
    const userlogin = firebase.auth().currentUser;
    if (userlogin) {
      const { groupName, createdBy, dateCreated, createdByUserId, createdByDisplayName } = req.body;
      const firebaseDatabase = firebase.database();
      const newKey = firebaseDatabase.ref('groups/').push({
        groupName,
        createdBy,
        dateCreated
      }).key;
      const groupRef = firebaseDatabase.ref(`groups/${newKey}/users/`);
      groupRef.child(createdByUserId).set({
        userId: createdByUserId,
        email: createdBy,
        userName: createdByDisplayName
      })
       .then(() => {
         const userRef = firebaseDatabase
         .ref(`users/${createdByUserId}/groups/`);
         userRef.child(newKey).set({
           groupId: newKey,
           groupName,
           newMessage: false
         });
         res.send({
           message: 'New group successfully created',
         });
       })
       .catch((error) => {
         res.status(500).send({
           message: `Error occurred ${error.message}`,
         });
       });
    } else {
      res.status(403).send({
        message: 'Only logged users can create groups'
      });
    }
  },

  /**
   * Add user to group
   * Route: POST: /group/:groupId/user
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {firebase} firebase firebase object
   * @returns {Response} response object
   */
  addUser(req, res, firebase) {
    const userlogin = firebase.auth().currentUser;
    if (userlogin) {
      const { userId, groupName, username, email } = req.body;
      const firebaseDatabase = firebase.database();
      const { groupId } = req.params;
      const groupRef = firebaseDatabase
        .ref(`groups/${groupId}/users/`);
      groupRef.child(userId).set({
        email,
        userId,
        userName: username
      })
       .then(() => {
         const userRef = firebaseDatabase
         .ref(`users/${userId}/groups/`);
         userRef.child(groupId).set({
           groupId,
           groupName,
           newMessage: false
         });
         res.send({
           message: 'User successfully added',
         });
       })
       .catch((error) => {
         res.status(500).send({
           message: `Error occurred ${error.message}`,
         });
       });
    } else {
      res.status(403).send({
        message: 'Only logged users can add users to groups'
      });
    }
  },

  /**
   * Post message to group
   * Route: POST: /group/:groupId/message
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {firebase} firebase firebase object
   * @param {io} io socket.io object
   * @returns {Response} response object
   */
  postMessage(req, res, firebase, io) {
    const userlogin = firebase.auth().currentUser;
    if (userlogin) {
      const { messageBody, groupId, postedBy, postedByDisplayName,
        postedon, priority, groupName, profilePic } = req.body;
      const firebaseDatabase = firebase.database();
      const subscribers = [];
      const messageRef = firebaseDatabase
         .ref(`groups/${groupId}/messages`);
      const newkey = messageRef.push({
        messageBody,
        postedBy,
        postedByDisplayName,
        postedon,
        priority,
        profilePic
      }).key;
      const userRef = firebaseDatabase
         .ref(`groups/${groupId}/users`);
      userRef.orderByKey().once('value', (snapshot) => {
        snapshot.forEach((childSnapShot) => {
          const groupRef = firebaseDatabase
            .ref(`users/${childSnapShot.key}/groups/${groupId}`);
          groupRef.update({
            newMessage: true
          });
          const userRef2 = firebaseDatabase
              .ref(`users/${childSnapShot.key}/groups/${groupId}/messages`);
          userRef2.child(newkey).set({
            messageBody,
            postedBy,
            postedByDisplayName,
            postedon,
            priority,
            isRead: false,
            profilePic
          });

          if (priority === 'critical') {
            const phoneRef = firebaseDatabase
              .ref(`users/${childSnapShot.key}`);
            phoneRef.once('value', (record) => {
              if (record.val().phoneNo !== '') {
                const smsObject = {
                  phoneNo: record.val().phoneNo,
                  groupName
                };
                sendSMS(smsObject);
              }
            });
          }
          if (priority === 'critical' ||
              priority === 'urgent') {
            const emailRef = firebaseDatabase
              .ref(`users/${childSnapShot.key}`);
            emailRef.once('value', (record) => {
              const emailObject = {
                To: record.val().email,
                groupName
              };
              sendEmail(emailObject);
            });
          }
          subscribers.push(childSnapShot.key);
        });
        io.emit('messageBroadcast', {
          subscribers,
          groupName,
          postedBy
        });
      })
       .then(() => {
         res.send({
           message: 'Message successfully added',
         });
       })
       .catch((error) => {
         res.status(500).send({
           message: `Error occurred ${error.message}`,
         });
       });
    } else {
      res.status(403).send({
        message: 'Only logged users can add messages to groups'
      });
    }
  },

  /**
   * Users who have read meassages
   * Route: GET: /group/:groupId/messages/:messageId/usersRead
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {firebase} firebase firebase object
   * @returns {Response} response object
   */
  userReadMessages(req, res, firebase) {
    const userlogin = firebase.auth().currentUser;
    const { groupId, messageId } = req.params;
    if (userlogin) {
      const isReadRef = firebase.database()
            .ref(`groups/${groupId}/messages/${messageId}/isRead`);
      const usersRead = [];
      isReadRef.orderByKey()
            .once('value', (snap) => {
              snap.forEach((littleSnap) => {
                const user = {
                  id: littleSnap.key,
                  email: littleSnap.val().email
                };
                usersRead.push(user);
              });
            }).then(() => {
              res.send({
                usersRead,
              });
            })
          .catch((error) => {
            res.status(500).send({
              message: `Error occurred ${error.message}`,
            });
          });
    } else {
      res.status(403).send({
        message: 'Please log in to see a list of your groups'
      });
    }
  },

  /**
   * Users not in groups
   * Route: GET: /group/:groupId/notusers
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {firebase} firebase firebase object
   * @returns {Response} response object
   */
  usersNotInGroups(req, res, firebase) {
    const userlogin = firebase.auth().currentUser;
    const { groupId } = req.params;
    if (userlogin) {
      const userRef = firebase.database()
        .ref(`groups/${groupId}/users/`);
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
      }).then(() => {
        userNotInGroup = lodash.differenceBy(allUsers, usersInGroup, 'id');
        res.send({
          userNotInGroup,
        });
      })
          .catch((error) => {
            res.status(500).send({
              message: `Error occurred ${error.message}`,
            });
          });
    } else {
      res.status(403).send({
        message: 'Please log in to see a list of your groups'
      });
    }
  }
};
