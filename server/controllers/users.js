import lodash from 'lodash';
import groupController from './groups';
import emailValidator from '../Utilities/emailValidator';

export default {
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

  signUp(req, res, firebase) {
    const { email, password, userName, photoURL, phoneNo } = req.body;
    if (!emailValidator(email)) {
      res.status(400).send({
        message: 'Please insert a valid email address'
      });
    } else if (email === '' || password === '' || userName === '') {
      res.status(400).send({
        message: 'Please insert email, password or username'
      });
    } else {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
          user.updateProfile({
            displayName: userName,
            photoURL,
            phoneNumber: phoneNo
          }).then(() => {
            firebase.auth().signInWithEmailAndPassword(email, password)
            .catch((error) => {
              res.status(500).send({
                message: `Error occured ${error.message}`
              });
            });
            const userRef = firebase.database()
             .ref('users/');
            userRef.child(user.uid).set({
              userName,
              email,
              phoneNo,
              profilePic: photoURL
            });
            res.status(201).send({
              message: `Welcome ${user.email}. Please proceed to log in`,
              user
            });
          });
        }).catch((error) => {
          res.status(500).send({
            message: 'An error occured while signing up user'
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

  googleSignin(req, res, firebase) {
    const idToken = req.body.idToken;
    const credential = firebase.auth.GoogleAuthProvider.credential(idToken);
    firebase.auth().signInWithCredential(credential)
  .then((user) => {
    const ref = firebase.database()
          .ref(`users/${user.uid}`);
    ref.once('value')
    .then((snapshot) => {
      if (!snapshot.exists()) {
        firebase.database()
         .ref('users/').child(user.uid).set({
           userName: user.displayName,
           email: user.email,
           phoneNo: '',
           profilePic: user.photoURL
         });
      }
    });
    res.status(201).send({
      message: `Welcome ${user.email}`,
      user
    });
  })
  .catch((error) => {
    res.status(500).send({
      message: 'An error occurred during google sign in'
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
  passwordReset(req, res, firebase) {
    const email = req.body.emailAddress;
    if (!emailValidator(email)) {
      res.status(400).send({
        message: 'Please insert valid email address'
      });
    } else if (email === '') {
      res.status(400).send({
        message: 'Please insert valid email address'
      });
    } else {
      firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      res.status(200).send({
        message: 'Email successfully. Kindly check your inbox for reset link.'
      });
    // Email sent.
    }).catch((error) => {
      if (error.code === 'auth/user-not-found') {
        res.status(401).send({
          message: 'The email address does not exist'
        });
      } else {
        res.status(500).send({
          message: 'An error occured during password reset'
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
  confirmPasswordReset(req, res, firebase) {
    firebase.auth().confirmPasswordReset(req.body.code, req.body.newPassword)
    .then(() => {
      res.send({
        message: 'Password successfully reset.'
      });
    // Email sent.
    }).catch((error) => {
      res.status(500).send({
        message: 'An error occured while confirming password reset'
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
  signOut(req, res, firebase) {
    firebase.auth().signOut()
    .then(() => {
      res.send({
        message: 'User successfully signed out.'
      });
    }).catch((error) => {
      res.status(500).send({
        message: 'An error occured whild signing out'
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
  signIn(req, res, firebase) {
    const { email, password } = req.body;
    if (!emailValidator(email)) {
      res.status(400).send({
        message: 'Please insert a valid email address'
      });
    } else if (email === '' || password === '') {
      res.status(400).send({
        message: 'Please insert email or password'
      });
    } else {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        res.send({
          message: `Welcome ${user.displayName}`,
          user
        });
      }).catch((error) => {
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
            message: 'An error occured while signing in'
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
  updateUserProfile(req, res, firebase) {
    const user = firebase.auth().currentUser;
    if (user) {
      let { userName, photoURL, phoneNo } = req.body;
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
        photoURL
      }).then(() => {
        const userRef = firebase.database()
             .ref(`users/${user.uid}`);
        userRef.update({
          phoneNo,
          userName,
          profilePic: photoURL
        });
        res.send({
          message: 'Profile update successful!',
          user
        });
      }).catch((error) => {
        res.status(500).send({
          message: 'An error occured while updating user profile'
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
  getGroupMessages(req, res, firebase, io) {
    const userLogIn = firebase.auth().currentUser;
    if (userLogIn) {
      const { userId, groupId } = req.params;
      const messageRef = firebase.database()
        .ref(`users/${userId}/groups/${groupId}/messages/`);
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
            postedOn: values.postedon,
            priority: values.priority,
            isRead: values.isRead,
          };
          ununiquegroupMessages.push(message);
          groupController
          .updateMessageFlag(firebase, userId, groupId, childSnapShot.key);
        });
        groupMessages = lodash.uniqBy(ununiquegroupMessages, 'id');
        io.emit('messageAdded', {
          groupMessages,
          groupId,
          userId
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
  getGroupMessagesQuick(req, res, firebase) {
    const userLogIn = firebase.auth().currentUser;
    if (userLogIn) {
      const { userId, groupId } = req.params;
      const messageRef = firebase.database()
      .ref(`users/${userId}/groups/${groupId}/messages/`);
      const groupMessages = [];
      messageRef.orderByKey().limitToLast(8).once('value', (snapshot) => {
        snapshot.forEach((childSnapShot) => {
          const message = {
            id: childSnapShot.key,
            messageBody: childSnapShot.val().messageBody,
            postedBy: childSnapShot.val().postedBy,
            postedByDisplayName: childSnapShot.val().postedByDisplayName,
            profilePic: childSnapShot.val().profilePic,
            postedOn: childSnapShot.val().postedon,
            priority: childSnapShot.val().priority,
            isRead: childSnapShot.val().isRead,
          };
          groupMessages.push(message);
        });
        res.send({
          groupMessages,
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
  getGroups(req, res, firebase) {
    const userLogIn = firebase.auth().currentUser;
    if (userLogIn) {
      const groupRef = firebase.database()
        .ref(`users/${req.params.userId}/groups/`);
      const groups = [];
      groupRef.once('value', (snapshot) => {
        snapshot.forEach((childSnapShot) => {
          const group = {
            groupId: childSnapShot.key,
            groupName: childSnapShot.val().groupName,
            newMessage: childSnapShot.val().newMessage
              // createdby: childSnapShot.val().createdby
          };
          groups.push(group);
        });
        res.send({
          groups,
        });
      });
    } else {
      res.status(401).send({
        message: 'Please log in to see a list of your groups'
      });
    }
  }
};
