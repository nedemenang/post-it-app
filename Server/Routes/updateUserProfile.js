module.exports = (request, result, firebase) => {
  firebase.auth().onAuthStateChanged((userlogin) => {
    if (userlogin) {
  // console.log('registering user...');
      const user = firebase.auth().currentUser;
      let userName = request.body.userName;
      let photo = request.body.photoURL;
      let phone = request.body.phoneNo;
      if (userName === '') {
        userName = user.displayName;
      }
      if (photo === '') {
        photo = user.photoURL;
      }

      if (phone === '') {
        phone = user.phoneNumber;
      }
      user.updateProfile({
        displayName: userName,
        photoURL: photo,
        phoneNumber: phone
      }).then(() => {
        const userRef = firebase.database()
       .ref(`users/${user.uid}`);
        userRef.update({
          phoneNo: phone,
          userName
        });
        result.send({
          message: 'Profile update successful!'
        });
      }).catch((error) => {
        result.status(500).send({
          message: `Error occured ${error.message}`
        });
      });
    } else {
      result.status(403).send({
        message: 'Only logged users update profile'
      });
    }
  });
};
