const Validator = (req, res, next) => {
  Object.keys(req.body).forEach((key) => {
    switch (key) {
    case 'email':
      req.check('email', 'Please insert email, password or username')
      .notEmpty();
      req.check('email', 'Please insert a valid email address').isEmail();
      break;
    case 'userName':
      req.check('userName', 'Please insert email, password or username')
      .notEmpty();
      break;
    case 'password':
      req.check('password', 'Please insert email or password')
      .notEmpty();
      break;
    case 'idToken':
      req.check('idToken', 'Please insert a token')
      .notEmpty();
      break;
    case 'newPassword':
      req.check('newPassword', 'Please new password')
      .notEmpty();
      break;
    case 'code':
      req.check('code', 'Please insert code')
      .notEmpty();
      break;
    case 'emailAddress':
      req.check('emailAddress', 'Please insert valid email address')
      .notEmpty();
      req.check('emailAddress', 'Please insert valid email address').isEmail();
      break;
    case 'userId':
      req.check('userId', 'Please insert userId or groupName')
      .notEmpty();
      break;
    default:
      break;
    }
  });

  Object.keys(req.params).forEach((key) => {
    switch (key) {
    case 'groupId':
      req.check('groupId', 'Please insert groupId')
      .notEmpty();
      req.check('groupId', 'Please insert valid groupId')
      .isLength(18, 35);
      break;
    case 'messageId':
      req.check('messageId', 'Please insert messageId')
      .notEmpty();
      req.check('messageId', 'Please insert valid messageId')
      .isLength(18, 35);
      break;
    case 'userId':
      req.check('userId', 'Please insert userId')
      .notEmpty();
      req.check('userId', 'Please insert valid userId')
      .isLength(18, 35);
      break;
    default:
      break;
    }
  });

  const errors = req.validationErrors();
  if (errors) {
    const message = errors[0].msg;
    res.status(400).send({ message });
  } else {
    next();
  }
};

export default Validator;
