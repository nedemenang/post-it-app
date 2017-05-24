const firebase = require('firebase');

const config = {
  apiKey: 'AIzaSyAUCocC9e7f3cohd-SiwJM8ZcCvL9tWO-A',
  authDomain: 'postit-e5e5e.firebaseapp.com',
  databaseURL: 'https://postit-e5e5e.firebaseio.com',
  projectId: 'postit-e5e5e',
  storageBucket: 'postit-e5e5e.appspot.com',
  messagingSenderId: '340486453500'
};
firebase.initializeApp(config);

module.exports = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const userName = req.body.userName;
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((user) => {
    user.updateProfile({
  displayName : userName,
}).then(function() {
				//console.log(user);
})
    res.send({
      message : 'Welcome ' + user.email
    });
  }).catch((e) => {
    res.send({
    message : 'Error occured '+ e.message
  })
  });	
}