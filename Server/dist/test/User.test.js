'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _server = require('../server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Require the dev-dependencies
_chai2.default.should();

_chai2.default.use(_chaiHttp2.default);

describe('Sign up Route', function () {
  it('should return 400 for an invalid email address', function (done) {
    _chai2.default.request(_server2.default).post('/users/signup').send({
      userName: 'invalidUser',
      email: 'invalidUserEmail',
      password: 'invalidPassword',
      photoURL: '',
      phoneNo: ''
    }).end(function (err, res) {
      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.equal('Please insert a valid email address');
      done();
    });
  });

  it('should return 400 for empty password and username', function (done) {
    _chai2.default.request(_server2.default).post('/users/signup').send({
      userName: '',
      email: 'validUserEmail@email.com',
      password: '',
      photoURL: '',
      phoneNo: ''
    }).end(function (err, res) {
      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.equal('Please insert email or password');
      done();
    });
  });

  it('should return 400 for an empty email address', function (done) {
    _chai2.default.request(_server2.default).post('/users/signup').send({
      userName: '',
      email: 'invalidUserEmail',
      password: 'invalidPassword',
      photoURL: '',
      phoneNo: ''
    }).end(function (err, res) {
      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.equal('Please insert a valid email address');
      done();
    });
  });

  it('should return 401 for an empty password field', function (done) {
    _chai2.default.request(_server2.default).post('/users/signup').send({
      userName: '',
      email: 'invalidUserEmail',
      password: '',
      photoURL: '',
      phoneNo: ''
    }).end(function (err, res) {
      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.equal('Please insert a valid email address');
      done();
    });
  });
  it('should return 200 for correct username and password', function (done) {
    var email = _faker2.default.internet.email();
    _chai2.default.request(_server2.default).post('/users/signup').send({
      userName: _faker2.default.name.firstName(),
      email: email,
      password: 'Password1',
      photoURL: '',
      phoneNo: _faker2.default.phone.phoneNumber()
    }).end(function (err, res) {
      res.status.should.equal(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.equal('Welcome ' + email.toLowerCase() + '. Please proceed to log in');
      done();
    });
  });
});

describe('Sign in route', function () {
  it('should return 400 for an invalid email address', function (done) {
    _chai2.default.request(_server2.default).post('/users/signin').send({
      email: 'invalidEmail',
      password: 'Password1'
    }).end(function (err, res) {
      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.equal('Please insert a valid email address');
      done();
    });
  });

  it('should return 400 for an empty email address', function (done) {
    _chai2.default.request(_server2.default).post('/users/signin').send({
      email: '',
      password: 'Password1'
    }).end(function (err, res) {
      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.equal('Please insert a valid email address');
      done();
    });
  });

  it('should return 400 for an empty password', function (done) {
    _chai2.default.request(_server2.default).post('/users/signin').send({
      email: 'validemail@gmail.com',
      password: ''
    }).end(function (err, res) {
      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.equal('Please insert email or password');
      done();
    });
  });

  it('should return 401  for invalid login email', function (done) {
    _chai2.default.request(_server2.default).post('/users/signin').send({
      email: 'Alec_Hartmann942@yahoo.com',
      password: 'Password1'
    }).end(function (err, res) {
      res.status.should.equal(401);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.equal('Invalid email address');
      done();
    });
  });

  it('should return 401  for invalid password', function (done) {
    _chai2.default.request(_server2.default).post('/users/signin').send({
      email: 'Alec_Hartmann94@yahoo.com',
      password: 'Password12'
    }).end(function (err, res) {
      res.status.should.equal(401);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.equal('Invalid Password');
      done();
    });
  });

  it('should return 200  for valid email and password', function (done) {
    _chai2.default.request(_server2.default).post('/users/signin').send({
      email: 'Alec_Hartmann94@yahoo.com',
      password: 'Password1'
    }).end(function (err, res) {
      res.status.should.equal(200);
      res.body.should.be.a('object');
      res.body.user.should.be.a('object');
      res.body.should.have.property('message');
      res.body.should.have.property('user');
      done();
    });
  });
});

describe('Sign out Route', function () {
  before(function (done) {
    _chai2.default.request(_server2.default).post('/users/signin').send({
      email: 'Alec_Hartmann94@yahoo.com',
      password: 'Password1'
    }).end(function () {
      done();
    });
  });

  it('should return 200  for valid sign out', function (done) {
    _chai2.default.request(_server2.default).post('/users/signout').end(function (err, res) {
      res.status.should.equal(200);
      res.body.should.be.a('object');
      res.body.message.should.equal('User successfully signed out.');
      res.body.should.have.property('message');
      done();
    });
  });
});

describe('Update user profile Route', function () {
  before(function (done) {
    _chai2.default.request(_server2.default).post('/users/signout').end(function () {
      done();
    });
  });

  it('should return 401 for users that are not logged in', function (done) {
    _chai2.default.request(_server2.default).post('/users/updateUserProfile').send({
      userName: _faker2.default.name.firstName(),
      photoURL: '',
      phoneNo: _faker2.default.phone.phoneNumber()
    }).end(function (err, res) {
      res.status.should.equal(401);
      res.body.should.be.a('object');
      res.body.message.should.equal('Only logged users update profile');
      res.body.should.have.property('message');
      done();
    });
  });
});

describe('Update user profile Route', function () {
  var userName = _faker2.default.name.firstName();
  var phoneNo = _faker2.default.phone.phoneNumber();

  before(function (done) {
    _chai2.default.request(_server2.default).post('/users/signin').send({
      email: 'alec_hartmann94@yahoo.com',
      password: 'Password1'
    }).end(function () {
      done();
    });
  });

  it('should return 200 for logged in users', function (done) {
    _chai2.default.request(_server2.default).post('/users/updateUserProfile').send({
      userName: userName,
      photoURL: '/' + userName + '.jpg',
      phoneNo: phoneNo
    }).end(function (err, res) {
      res.status.should.equal(200);
      res.body.should.be.a('object');
      res.body.message.should.equal('Profile update successful!');
      res.body.should.have.property('message');
      res.body.user.displayName.should.equal(userName);
      res.body.user.photoURL.should.equal('/' + userName + '.jpg');
      done();
    });
  });

  it('should return 200 for logged in users and make no changes if no changes are required', function (done) {
    _chai2.default.request(_server2.default).post('/users/updateUserProfile').send({
      userName: '',
      photoURL: '',
      phoneNo: ''
    }).end(function (err, res) {
      res.status.should.equal(200);
      res.body.should.be.a('object');
      res.body.message.should.equal('Profile update successful!');
      res.body.should.have.property('message');
      res.body.user.displayName.should.equal(userName);
      res.body.user.photoURL.should.equal('/' + userName + '.jpg');
      done();
    });
  });
});

describe('Get group route', function () {
  before(function (done) {
    _chai2.default.request(_server2.default).post('/users/signout').end(function () {
      done();
    });
  });

  it('should return 401 for users that are not logged in', function (done) {
    var userId = '6OWdy7WUyoSqxYoKSUkUIMI8ZWr2';
    _chai2.default.request(_server2.default).get('/user/' + userId + '/groups').end(function (err, res) {
      res.status.should.equal(401);
      res.body.should.be.a('object');
      res.body.message.should.equal('Please log in to see a list of your groups');
      res.body.should.have.property('message');
      done();
    });
  });
});

describe('Get group route', function () {
  before(function (done) {
    _chai2.default.request(_server2.default).post('/users/signin').send({
      email: 'alec_hartmann94@yahoo.com',
      password: 'Password1'
    }).end(function () {
      done();
    });
  });

  it('should return 200 for users that are logged in', function (done) {
    var userId = '6OWdy7WUyoSqxYoKSUkUIMI8ZWr2';
    _chai2.default.request(_server2.default).get('/user/' + userId + '/groups').end(function (err, res) {
      res.status.should.equal(200);
      res.body.should.be.a('object');
      res.body.should.have.property('groups');
      done();
    });
  });
});

describe('Get group messages quick route', function () {
  before(function (done) {
    _chai2.default.request(_server2.default).post('/users/signout').end(function () {
      done();
    });
  });

  it('should return 401 for users that are not logged in', function (done) {
    _chai2.default.request(_server2.default).get('/user/6OWdy7WUyoSqxYoKSUkUIMI8ZWr2/group/-KrAwfM16qbLOig_mSOc/quickMessages').end(function (err, res) {
      res.status.should.equal(401);
      res.body.should.be.a('object');
      res.body.message.should.equal('Please log in to see a list of your groups messages');
      res.body.should.have.property('message');
      done();
    });
  });
});

describe('Get group messages quick route', function () {
  before(function (done) {
    _chai2.default.request(_server2.default).post('/users/signin').send({
      email: 'alec_hartmann94@yahoo.com',
      password: 'Password1'
    }).end(function () {
      done();
    });
  });

  it('should return 200 for users that are logged in', function (done) {
    _chai2.default.request(_server2.default).get('/user/6OWdy7WUyoSqxYoKSUkUIMI8ZWr2/group/-KrAwfM16qbLOig_mSOc/quickMessages').end(function (err, res) {
      res.status.should.equal(200);
      res.body.should.be.a('object');
      res.body.should.have.property('groupMessages');
      res.body.groupMessages.should.be.a('array');
      done();
    });
  });
});

describe('Get group messages route', function () {
  before(function (done) {
    _chai2.default.request(_server2.default).post('/users/signout').end(function () {
      done();
    });
  });

  it('should return 401 for users that are not logged in', function (done) {
    _chai2.default.request(_server2.default).get('/user/6OWdy7WUyoSqxYoKSUkUIMI8ZWr2/group/-KrAwfM16qbLOig_mSOc/messages').end(function (err, res) {
      res.status.should.equal(401);
      res.body.should.be.a('object');
      res.body.message.should.equal('Please log in to see a list of your groups messages');
      res.body.should.have.property('message');
      done();
    });
  });
});

describe('Password Reset', function () {
  it('should return 400 for invalid email address', function (done) {
    _chai2.default.request(_server2.default).post('/users/passwordReset').send({
      emailAddress: 'invalidemail'
    }).end(function (err, res) {
      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.message.should.equal('Please insert valid email address');
      res.body.should.have.property('message');
      done();
    });
  });

  it('should return 400 for empty email address', function (done) {
    _chai2.default.request(_server2.default).post('/users/passwordReset').send({
      emailAddress: ''
    }).end(function (err, res) {
      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.message.should.equal('Please insert valid email address');
      res.body.should.have.property('message');
      done();
    });
  });

  it('should return 401 for valid unregistered email', function (done) {
    _chai2.default.request(_server2.default).post('/users/passwordReset').send({
      emailAddress: 'somebody.validemail@email.com'
    }).end(function (err, res) {
      res.status.should.equal(401);
      res.body.should.be.a('object');
      res.body.message.should.equal('The email address does not exist');
      res.body.should.have.property('message');
      done();
    });
  });

  it('should return 200 for valid registered email', function (done) {
    _chai2.default.request(_server2.default).post('/users/passwordReset').send({
      emailAddress: 'Wava40@hotmail.com'
    }).end(function (err, res) {
      res.status.should.equal(200);
      res.body.should.be.a('object');
      res.body.message.should.equal('Email successfully. Kindly check your inbox for reset link.');
      res.body.should.have.property('message');
      done();
    });
  });
});