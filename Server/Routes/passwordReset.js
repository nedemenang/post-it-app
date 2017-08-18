

module.exports = (request, result, firebase) => {
  firebase.auth().sendPasswordResetEmail(request.body.emailAddress)
  .then(() =>  {
    result.send({
      message: 'Email successfully sent. Kindly check your inbox for reset link.'
    });
  // Email sent.
}).catch((error) => {
  result.status(500).send({
      message: `Error occured while sending:  ${error.message}`
    });
    // An error happened. 
});


};
