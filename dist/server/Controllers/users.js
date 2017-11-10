'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _groups = require('./groups');

var _groups2 = _interopRequireDefault(_groups);

var _emailValidator = require('../Utilities/emailValidator');

var _emailValidator2 = _interopRequireDefault(_emailValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  /**
     * Register New User
     * Route: POST: /users/signup
     *
     * @param {Object} req request object
     * @param {Object} res response object
     * @param {firebase} firebase firebase object
     *
     * @returns {response} Response object
     */

  signUp: function signUp(req, res, firebase) {
    var _req$body = req.body,
        email = _req$body.email,
        password = _req$body.password,
        userName = _req$body.userName,
        photoURL = _req$body.photoURL,
        phoneNo = _req$body.phoneNo;

    if (!(0, _emailValidator2.default)(email)) {
      res.status(400).send({
        message: 'Please insert a valid email address'
      });
    } else if (email === '' || password === '' || userName === '') {
      res.status(400).send({
        message: 'Please insert email or password'
      });
    } else {
      firebase.auth().createUserWithEmailAndPassword(email, password).then(function (user) {
        user.updateProfile({
          displayName: userName,
          photoURL: photoURL,
          phoneNumber: phoneNo
        }).then(function () {
          firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
            res.status(500).send({
              message: 'Error occured ' + error.message
            });
          });
          var userRef = firebase.database().ref('users/');
          userRef.child(user.uid).set({
            userName: userName,
            email: email,
            phoneNo: phoneNo,
            profilePic: photoURL
          });
          res.send({
            message: 'Welcome ' + user.email + '. Please proceed to log in',
            user: user
          });
        });
      }).catch(function (error) {
        res.status(500).send({
          message: 'Error occured ' + error.message
        });
      });
    }
  },

  /**
   * Google Sign In
   * Route: POST: /users/googleSignin
   *
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {firebase} firebase firebase object
   *
   * @returns {Response} response object
   */

  googleSignin: function googleSignin(req, res, firebase) {
    var idToken = req.body.idToken;
    var credential = firebase.auth.GoogleAuthProvider.credential(idToken);
    firebase.auth().signInWithCredential(credential).then(function (user) {
      var ref = firebase.database().ref('users/' + user.uid);
      ref.once('value').then(function (snapshot) {
        if (!snapshot.exists()) {
          firebase.database().ref('users/').child(user.uid).set({
            userName: user.displayName,
            email: user.email,
            phoneNo: '',
            profilePic: user.photoURL
          });
        }
      });
      res.send({
        message: 'Welcome ' + user.email,
        user: user
      });
    }).catch(function (error) {
      res.status(500).send({
        message: 'Error occured while login in: ' + error.message
      });
    });
  },


  /**
   * Password Reset
   * Route: POST: /users/passwordReset
   *
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {firebase} firebase firebase object
   *
   * @returns {Response} response object
   */
  passwordReset: function passwordReset(req, res, firebase) {
    var email = req.body.emailAddress;
    if (!(0, _emailValidator2.default)(email)) {
      res.status(400).send({
        message: 'Please insert valid email address'
      });
    } else if (email === '') {
      res.status(400).send({
        message: 'Please insert valid email address'
      });
    } else {
      firebase.auth().sendPasswordResetEmail(email).then(function () {
        res.status(200).send({
          message: 'Email successfully. Kindly check your inbox for reset link.'
        });
        // Email sent.
      }).catch(function (error) {
        if (error.code === 'auth/user-not-found') {
          res.status(401).send({
            message: 'The email address does not exist'
          });
        } else {
          res.status(500).send({
            message: 'Error occured while sending:  ' + error.message
          });
        }
      });
    }
  },


  /**
   * Confirm Password Reset
   * Route: POST: /users/confirmPasswordReset
   *
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {firebase} firebase firebase object
   *
   * @returns {Response} response object
   */
  confirmPasswordReset: function confirmPasswordReset(req, res, firebase) {
    firebase.auth().confirmPasswordReset(req.body.code, req.body.newPassword).then(function () {
      res.send({
        message: 'Password successfully reset.'
      });
      // Email sent.
    }).catch(function (error) {
      res.status(500).send({
        message: 'Error occured while resetting password:  ' + error.message
      });
      // An error happened.
    });
  },


  /**
   * Sign out
   * Route: POST: /users/signout
   *
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {firebase} firebase firebase object
   *
   * @returns {Response} response object
   */
  signOut: function signOut(req, res, firebase) {
    firebase.auth().signOut().then(function () {
      res.send({
        message: 'User successfully signed out.'
      });
    }).catch(function (error) {
      res.status(500).send({
        message: 'Error occured while signing out :  ' + error.message
      });
    });
  },


  /**
   * Sign In
   * Route: POST: /users/signin
   *
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {firebase} firebase firebase object
   *
   * @returns {Response} response object
   */
  signIn: function signIn(req, res, firebase) {
    var _req$body2 = req.body,
        email = _req$body2.email,
        password = _req$body2.password;

    if (!(0, _emailValidator2.default)(email)) {
      res.status(400).send({
        message: 'Please insert a valid email address'
      });
    } else if (email === '' || password === '') {
      res.status(400).send({
        message: 'Please insert email or password'
      });
    } else {
      firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) {
        res.send({
          message: 'Welcome ' + user.displayName,
          user: user
        });
      }).catch(function (error) {
        if (error.code === 'auth/wrong-password') {
          res.status(401).send({
            message: 'Invalid Password'
          });
        } else if (error.code === 'auth/user-not-found') {
          res.status(401).send({
            message: 'Invalid email address'
          });
        } else {
          res.status(500).send({
            message: 'Error occured while login in:  ' + error.message
          });
        }
      });
    }
  },


  /**
   * Update User Profile
   * Route: POST: /users/updateUpdateUserProfle
   *
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {firebase} firebase firebase object
   *
   * @returns {Response} response object
   */
  updateUserProfile: function updateUserProfile(req, res, firebase) {
    var user = firebase.auth().currentUser;
    if (user) {
      var _req$body3 = req.body,
          userName = _req$body3.userName,
          photoURL = _req$body3.photoURL,
          phoneNo = _req$body3.phoneNo;

      if (userName === '') {
        userName = user.displayName;
      }
      if (photoURL === '') {
        photoURL = user.photoURL;
      }
      if (phoneNo === '') {
        phoneNo = user.phoneNumber;
      }
      user.updateProfile({
        displayName: userName,
        photoURL: photoURL
      }).then(function () {
        var userRef = firebase.database().ref('users/' + user.uid);
        userRef.update({
          phoneNo: phoneNo,
          userName: userName,
          profilePic: photoURL
        });
        res.send({
          message: 'Profile update successful!',
          user: user
        });
      }).catch(function (error) {
        res.status(500).send({
          message: 'Error occured ' + error.message
        });
      });
    } else {
      res.status(401).send({
        message: 'Only logged users update profile'
      });
    }
  },


  /**
   * Get all messages in a users group with event listener
   * Route: GET: /users/:userId/group/:groupId/messages
   *
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {firebase} firebase firebase object
   * @param {io} io socket.io object
   *
   * @returns {Response} response object
   */
  getGroupMessages: function getGroupMessages(req, res, firebase, io) {
    var userLogIn = firebase.auth().currentUser;
    if (userLogIn) {
      var _req$params = req.params,
          userId = _req$params.userId,
          groupId = _req$params.groupId;

      var messageRef = firebase.database().ref('users/' + userId + '/groups/' + groupId + '/messages/');
      var ununiquegroupMessages = [];
      var groupMessages = [];
      messageRef.orderByKey().limitToLast(8).on('value', function (snapshot) {
        snapshot.forEach(function (childSnapShot) {
          var values = childSnapShot.val();
          var message = {
            id: childSnapShot.key,
            messageBody: values.messageBody,
            postedBy: values.postedBy,
            postedByDisplayName: values.postedByDisplayName,
            profilePic: values.profilePic,
            postedon: values.postedon,
            priority: values.priority,
            isRead: values.isRead
          };
          ununiquegroupMessages.push(message);
          _groups2.default.updateMessageFlag(firebase, userId, groupId, childSnapShot.key);
        });
        groupMessages = _lodash2.default.uniqBy(ununiquegroupMessages, 'id');
        io.emit('messageAdded', {
          groupMessages: groupMessages,
          groupId: groupId,
          userId: userId
        });
      });
    } else {
      res.status(401).send({
        message: 'Please log in to see a list of your groups messages'
      });
    }
  },


  /**
   * Get all messages in a users group without event listener
   * Route: GET: /users/:userId/group/:groupId/quickMessages
   *
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {firebase} firebase firebase object
   *
   * @returns {Response} response object
   */
  getGroupMessagesQuick: function getGroupMessagesQuick(req, res, firebase) {
    var userLogIn = firebase.auth().currentUser;
    if (userLogIn) {
      var _req$params2 = req.params,
          userId = _req$params2.userId,
          groupId = _req$params2.groupId;

      var messageRef = firebase.database().ref('users/' + userId + '/groups/' + groupId + '/messages/');
      var groupMessages = [];
      messageRef.orderByKey().limitToLast(8).once('value', function (snapshot) {
        snapshot.forEach(function (childSnapShot) {
          var message = {
            id: childSnapShot.key,
            messageBody: childSnapShot.val().messageBody,
            postedBy: childSnapShot.val().postedBy,
            postedByDisplayName: childSnapShot.val().postedByDisplayName,
            profilePic: childSnapShot.val().profilePic,
            postedon: childSnapShot.val().postedon,
            priority: childSnapShot.val().priority,
            isRead: childSnapShot.val().isRead
          };
          groupMessages.push(message);
        });
        res.send({
          groupMessages: groupMessages
        });
      });
    } else {
      res.status(401).send({
        message: 'Please log in to see a list of your groups messages'
      });
    }
  },


  /**
   * Get user groups
   * Route: GET: /users/:userId/groups/
   *
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {firebase} firebase firebase object
   *
   * @returns {Response} response object
   */
  getGroups: function getGroups(req, res, firebase) {
    var userLogIn = firebase.auth().currentUser;
    if (userLogIn) {
      var groupRef = firebase.database().ref('users/' + req.params.userId + '/groups/');
      var groups = [];
      groupRef.once('value', function (snapshot) {
        snapshot.forEach(function (childSnapShot) {
          var group = {
            groupId: childSnapShot.key,
            groupname: childSnapShot.val().groupName,
            newMessage: childSnapShot.val().newMessage
            // createdby: childSnapShot.val().createdby
          };
          groups.push(group);
        });
        res.send({
          groups: groups
        });
      });
    } else {
      res.status(401).send({
        message: 'Please log in to see a list of your groups'
      });
    }
  }
};