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
    case 'emailAddress':
      req.check('emailAddress', 'Please insert valid email address')
      .notEmpty();
      req.check('emailAddress', 'Please insert valid email address').isEmail();
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
