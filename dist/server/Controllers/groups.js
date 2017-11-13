'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _sendSms = require('../Utilities/sendSms');

var _sendSms2 = _interopRequireDefault(_sendSms);

var _sendMail = require('../Utilities/sendMail');

var _sendMail2 = _interopRequireDefault(_sendMail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

  /**
     * Update message flags
     * Route: GET: /group/updateMessageFlag
     *
     * @param {Object} firebase firebase object
     * @param {string} userId user Id string
     * @param {string} groupId groupId string
     * @param {string} messageId messageId string
     *
     * @returns {void} no returns
     */
  updateMessageFlag: function updateMessageFlag(firebase, userId, groupId, messageId) {
    var userLogIn = firebase.auth().currentUser;
    if (userLogIn) {
      var firebaseDatabase = firebase.database();
      var isReadRef = firebaseDatabase.ref('groups/' + groupId + '/messages/' + messageId + '/isRead/' + userId);
      isReadRef.once('value', function (snap) {
        if (snap.val() === null) {
          firebaseDatabase.ref('users/' + userId).once('value', function (emailSnap) {
            firebaseDatabase.ref('groups/' + groupId + '/messages/' + messageId + '/isRead').child(userId).set({
              email: emailSnap.val().email
            });
          });
        }
      });
      var userRef = firebaseDatabase.ref('users/' + userId + '/groups/' + groupId + '/messages/' + messageId);
      userRef.once('value', function (checkSnap) {
        if (checkSnap.val() !== null) {
          userRef.update({
            isRead: true
          });
        }
      });
      var groupRef = firebaseDatabase.ref('users/' + userId + '/groups/' + groupId + '/');
      groupRef.update({
        newMessage: false
      });
    }
  },


  /**
   * Create new group
   * Route: POST: /group
   *
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {firebase} firebase firebase object
   *
   * @returns {Response} response object
   */
  create: function create(req, res, firebase) {
    var userLogIn = firebase.auth().currentUser;
    if (userLogIn) {
      var _req$body = req.body,
          groupName = _req$body.groupName,
          createdBy = _req$body.createdBy,
          dateCreated = _req$body.dateCreated,
          createdByUserId = _req$body.createdByUserId,
          createdByDisplayName = _req$body.createdByDisplayName;

      if (groupName !== '' || createdBy !== '' || dateCreated !== '') {
        var firebaseDatabase = firebase.database();
        var newKey = firebaseDatabase.ref('groups/').push({
          groupName: groupName,
          createdBy: createdBy,
          dateCreated: dateCreated
        }).key;
        var groupRef = firebaseDatabase.ref('groups/' + newKey + '/users/');
        groupRef.child(createdByUserId).set({
          userId: createdByUserId,
          email: createdBy,
          userName: createdByDisplayName
        }).then(function () {
          var userRef = firebaseDatabase.ref('users/' + createdByUserId + '/groups/');
          userRef.child(newKey).set({
            groupId: newKey,
            groupName: groupName,
            newMessage: false
          });
          res.send({
            message: 'New group successfully created'
          });
        }).catch(function (error) {
          res.status(500).send({
            message: 'Error occurred ' + error.message
          });
        });
      } else {
        res.status(400).send({
          message: 'Incomplete parameters!'
        });
      }
    } else {
      res.status(401).send({
        message: 'Only logged users can create groups'
      });
    }
  },


  /**
   * Add user to group
   * Route: POST: /group/:groupId/user
   *
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {firebase} firebase firebase object
   *
   * @returns {Response} response object
   */
  addUser: function addUser(req, res, firebase) {
    var userLogIn = firebase.auth().currentUser;
    if (userLogIn) {
      var _req$body2 = req.body,
          userId = _req$body2.userId,
          groupName = _req$body2.groupName,
          username = _req$body2.username,
          email = _req$body2.email;

      if (userId !== '' || groupName !== '') {
        var firebaseDatabase = firebase.database();
        var groupId = req.params.groupId;

        var groupRef = firebaseDatabase.ref('groups/' + groupId + '/users/');
        groupRef.child(userId).set({
          email: email,
          userId: userId,
          userName: username
        }).then(function () {
          var userRef = firebaseDatabase.ref('users/' + userId + '/groups/');
          userRef.child(groupId).set({
            groupId: groupId,
            groupName: groupName,
            newMessage: false
          });
          res.send({
            message: 'User successfully added'
          });
        }).catch(function (error) {
          res.status(500).send({
            message: 'Error occurred ' + error.message
          });
        });
      } else {
        res.status(400).send({
          message: 'Incomplete parameters'
        });
      }
    } else {
      res.status(401).send({
        message: 'Only logged users can add users to groups'
      });
    }
  },


  /**
   * Add user to group
   * Route: POST: /group/remove
   *
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {firebase} firebase firebase object
   *
   * @returns {Response} response object
   */
  removeUser: function removeUser(req, res, firebase) {
    var userLogIn = firebase.auth().currentUser;
    if (userLogIn) {
      var _req$body3 = req.body,
          userId = _req$body3.userId,
          groupId = _req$body3.groupId;

      var firebaseDatabase = firebase.database();
      var groupRef = firebaseDatabase.ref('groups/' + groupId + '/users/' + userId);
      groupRef.remove().then(function () {
        var userRef = firebaseDatabase.ref('users/' + userId + '/groups/' + groupId);
        userRef.remove();
        res.send({
          message: 'User successfully removed'
        });
      }).catch(function (error) {
        res.status(500).send({
          message: 'Error occurred ' + error.message
        });
      });
    } else {
      res.status(401).send({
        message: 'Only logged in users can remove from groups'
      });
    }
  },

  /**
   * Post message to group
   * Route: POST: /group/:groupId/message
   *
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {firebase} firebase firebase object
   * @param {io} io socket.io object
   *
   * @returns {Response} response object
   */
  postMessage: function postMessage(req, res, firebase, io) {
    var userLogIn = firebase.auth().currentUser;
    if (userLogIn) {
      var _req$body4 = req.body,
          messageBody = _req$body4.messageBody,
          groupId = _req$body4.groupId,
          postedBy = _req$body4.postedBy,
          postedByDisplayName = _req$body4.postedByDisplayName,
          postedon = _req$body4.postedon,
          priority = _req$body4.priority,
          groupName = _req$body4.groupName,
          profilePic = _req$body4.profilePic;

      if (messageBody !== '' || groupId !== '' || postedBy !== '' || priority !== '') {
        var firebaseDatabase = firebase.database();
        var subscribers = [];
        var messageRef = firebaseDatabase.ref('groups/' + groupId + '/messages');
        var newkey = messageRef.push({
          messageBody: messageBody,
          postedBy: postedBy,
          postedByDisplayName: postedByDisplayName,
          postedon: postedon,
          priority: priority,
          profilePic: profilePic
        }).key;
        var userRef = firebaseDatabase.ref('groups/' + groupId + '/users');
        userRef.orderByKey().once('value', function (snapshot) {
          snapshot.forEach(function (childSnapShot) {
            var groupRef = firebaseDatabase.ref('users/' + childSnapShot.key + '/groups/' + groupId);
            groupRef.update({
              newMessage: true
            });
            var userRef2 = firebaseDatabase.ref('users/' + childSnapShot.key + '/groups/' + groupId + '/messages');
            userRef2.child(newkey).set({
              messageBody: messageBody,
              postedBy: postedBy,
              postedByDisplayName: postedByDisplayName,
              postedon: postedon,
              priority: priority,
              isRead: false,
              profilePic: profilePic
            });

            if (priority === 'critical') {
              var phoneRef = firebaseDatabase.ref('users/' + childSnapShot.key);
              phoneRef.once('value', function (record) {
                if (record.val().phoneNo !== '') {
                  var smsObject = {
                    phoneNo: record.val().phoneNo,
                    groupName: groupName
                  };
                  (0, _sendSms2.default)(smsObject);
                }
              });
            }
            if (priority === 'critical' || priority === 'urgent') {
              var emailRef = firebaseDatabase.ref('users/' + childSnapShot.key);
              emailRef.once('value', function (record) {
                var emailObject = {
                  To: record.val().email,
                  groupName: groupName
                };
                (0, _sendMail2.default)(emailObject);
              });
            }
            subscribers.push(childSnapShot.key);
          });
          io.emit('messageBroadcast', {
            subscribers: subscribers,
            groupName: groupName,
            postedBy: postedBy
          });
        }).then(function () {
          res.send({
            message: 'Message successfully added'
          });
        }).catch(function (error) {
          console.log(error);
          res.status(500).send({
            message: 'Error occurred ' + error.message
          });
        });
      } else {
        res.status(400).send({
          message: 'Incomplete parameters'
        });
      }
    } else {
      res.status(401).send({
        message: 'Only logged users can add messages to groups'
      });
    }
  },


  /**
   * Users who have read meassages
   * Route: GET: /group/:groupId/messages/:messageId/usersRead
   *
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {firebase} firebase firebase object
   *
   * @returns {Response} response object
   */
  getUserReadMessages: function getUserReadMessages(req, res, firebase) {
    var userLogIn = firebase.auth().currentUser;
    var _req$params = req.params,
        groupId = _req$params.groupId,
        messageId = _req$params.messageId;

    if (userLogIn) {
      var isReadRef = firebase.database().ref('groups/' + groupId + '/messages/' + messageId + '/isRead');
      var usersRead = [];
      isReadRef.orderByKey().once('value', function (snap) {
        snap.forEach(function (littleSnap) {
          var user = {
            id: littleSnap.key,
            email: littleSnap.val().email
          };
          usersRead.push(user);
        });
      }).then(function () {
        res.send({
          usersRead: usersRead
        });
      }).catch(function (error) {
        res.status(500).send({
          message: 'Error occurred ' + error.message
        });
      });
    } else {
      res.status(401).send({
        message: 'Please log in to see who has read the message'
      });
    }
  },


  /**
   * Users not in groups
   * Route: GET: /group/:groupId/notusers
   *
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {firebase} firebase firebase object
   *
   * @returns {Response} response object
   */
  getUsersNotInGroups: function getUsersNotInGroups(req, res, firebase) {
    var userLogIn = firebase.auth().currentUser;
    var groupId = req.params.groupId;

    if (userLogIn) {
      var userRef = firebase.database().ref('groups/' + groupId + '/users/');
      var allUserRef = firebase.database().ref('users');
      var usersInGroup = [];
      var allUsers = [];
      var userNotInGroup = [];
      userRef.orderByKey().once('value', function (snapshot) {
        snapshot.forEach(function (childSnapShot) {
          var user = {
            id: childSnapShot.key,
            email: childSnapShot.val().email,
            username: childSnapShot.val().userName,
            profilePic: childSnapShot.val().profilePic
          };
          usersInGroup.push(user);
        });
      });
      allUserRef.orderByKey().once('value', function (snapshot) {
        snapshot.forEach(function (childSnapShot) {
          var users = {
            id: childSnapShot.key,
            email: childSnapShot.val().email,
            username: childSnapShot.val().userName,
            profilePic: childSnapShot.val().profilePic
          };
          allUsers.push(users);
        });
      }).then(function () {
        userNotInGroup = _lodash2.default.differenceBy(allUsers, usersInGroup, 'id');
        res.send({
          userNotInGroup: userNotInGroup
        });
      }).catch(function (error) {
        res.status(500).send({
          message: 'Error occurred ' + error.message
        });
      });
    } else {
      res.status(401).send({
        message: 'Please log in to see a list of users not in group'
      });
    }
  }
};