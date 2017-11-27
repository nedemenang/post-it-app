const Validator = (req, res, next) => {
  req.check('email', 'Please insert email, password or username').notEmpty();
  req.check('email', 'Please insert a valid email address').isEmail();
  req.check('userName', 'Please insert email, password or username').notEmpty();
  req.check('password', 'Please insert email, password or username').notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    const message = errors[0].msg;
    res.status(400).send({ message });
  } else {
    next();
  }
};

export default Validator;
