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

describe('Create group route', function () {
  before(function (done) {
    _chai2.default.request(_server2.default).post('/users/signout').end(function () {
      done();
    });
  });

  it('should return 401 for users that are not logged in', function (done) {
    _chai2.default.request(_server2.default).post('/group').send({
      groupName: _faker2.default.company.companyName(),
      createdBy: 'alec_hartmann94@yahoo.com',
      dateCreated: new Date().toLocaleString('en-GB'),
      createdByUserId: '6OWdy7WUyoSqxYoKSUkUIMI8ZWr2',
      createdByDisplayName: 'Alec'
    }).end(function (err, res) {
      res.status.should.equal(401);
      res.body.should.be.a('object');
      res.body.message.should.equal('Only logged users can create groups');
      res.body.should.have.property('message');
      done();
    });
  });
});

describe('Create group route', function () {
  beforeEach(function (done) {
    _chai2.default.request(_server2.default).post('/users/signin').send({
      email: 'alec_hartmann94@yahoo.com',
      password: 'Password1'
    }).end(function () {
      done();
    });
  });

  it('should return 400 for empty group name or created by or date created', function (done) {
    _chai2.default.request(_server2.default).post('/group').send({
      groupName: '',
      createdBy: '',
      dateCreated: '',
      createdByUserId: '',
      createdByDisplayName: ''
    }).end(function (err, res) {
      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.message.should.equal('Incomplete parameters!');
      res.body.should.have.property('message');
      done();
    });
  });

  it('should return 200 for valid users with valid inputs', function (done) {
    _chai2.default.request(_server2.default).post('/group').send({
      groupName: _faker2.default.company.companyName(),
      createdBy: 'alec_hartmann94@yahoo.com',
      dateCreated: new Date().toLocaleString('en-GB'),
      createdByUserId: '6OWdy7WUyoSqxYoKSUkUIMI8ZWr2',
      createdByDisplayName: 'Alec'
    }).end(function (err, res) {
      res.status.should.equal(200);
      res.body.should.be.a('object');
      res.body.message.should.equal('New group successfully created');
      res.body.should.have.property('message');
      done();
    });
  });
});

describe('Add user to group route', function () {
  // userId, groupName, username, email
  before(function (done) {
    _chai2.default.request(_server2.default).post('/users/signout').end(function () {
      done();
    });
  });

  it('should return 401 for users that are not logged in', function (done) {
    // userId, groupName, username, email
    _chai2.default.request(_server2.default).post('/group/-Kwetw__qC1ogqKZDAx7/user').send({
      userId: '6OWdy7WUyoSqxYoKSUkUIMI8ZWr2',
      groupName: 'Denesik - Stiedemann',
      username: 'Beulah',
      email: 'Onie89@yahoo.com'
    }).end(function (err, res) {
      res.status.should.equal(401);
      res.body.should.be.a('object');
      res.body.message.should.equal('Only logged users can add users to groups');
      res.body.should.have.property('message');
      done();
    });
  });
});

describe('Add user to group route', function () {
  // userId, groupName, username, email
  beforeEach(function (done) {
    _chai2.default.request(_server2.default).post('/users/signin').send({
      email: 'alec_hartmann94@yahoo.com',
      password: 'Password1'
    }).end(function () {
      done();
    });
  });

  it('should return 400 for incomplete parameters', function (done) {
    // userId, groupName, username, email
    _chai2.default.request(_server2.default).post('/group/-Kwetw__qC1ogqKZDAx7/user').send({
      userId: '',
      groupName: '',
      username: '',
      email: ''
    }).end(function (err, res) {
      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.message.should.equal('Incomplete parameters');
      res.body.should.have.property('message');
      done();
    });
  });

  it('should return 200 for logged in users and complete parameters', function (done) {
    // userId, groupName, username, email
    _chai2.default.request(_server2.default).post('/group/-Kwetw__qC1ogqKZDAx7/user').send({
      userId: '6OWdy7WUyoSqxYoKSUkUIMI8ZWr2',
      groupName: 'Denesik - Stiedemann',
      username: 'Beulah',
      email: 'Onie89@yahoo.com'
    }).end(function (err, res) {
      res.status.should.equal(200);
      res.body.should.be.a('object');
      res.body.message.should.equal('User successfully added');
      res.body.should.have.property('message');
      done();
    });
  });

  after(function (done) {
    _chai2.default.request(_server2.default).post('/group/remove').send({
      userId: '6OWdy7WUyoSqxYoKSUkUIMI8ZWr2',
      groupId: '-Kwetw__qC1ogqKZDAx7'
    }).end(function () {
      done();
    });
  });
});

describe('Post message route', function () {
  before(function (done) {
    _chai2.default.request(_server2.default).post('/users/signout').end(function () {
      done();
    });
  });

  it('should return 401 for users that are not logged in', function (done) {
    _chai2.default.request(_server2.default).post('/group/-Kwetw__qC1ogqKZDAx7/message').send({
      messageBody: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      groupId: '-Kwetw__qC1ogqKZDAx7',
      postedBy: '',
      postedByDisplayName: '6OWdy7WUyoSqxYoKSUkUIMI8ZWr2',
      postedon: new Date().toLocaleString('en-GB'),
      priority: 'normal',
      groupName: 'Denesik - Stiedemann',
      profilePic: ''
    }).end(function (err, res) {
      res.status.should.equal(401);
      res.body.should.be.a('object');
      res.body.message.should.equal('Only logged users can add messages to groups');
      res.body.should.have.property('message');
      done();
    });
  });
});

describe('Post message route', function () {
  beforeEach(function (done) {
    _chai2.default.request(_server2.default).post('/users/signin').send({
      email: 'alec_hartmann94@yahoo.com',
      password: 'Password1'
    }).end(function () {
      done();
    });
  });

  it('should return 400 for logged in users with incomplete parameters', function (done) {
    _chai2.default.request(_server2.default).post('/group/-Kwetw__qC1ogqKZDAx7/message').send({
      messageBody: '',
      groupId: '',
      postedBy: '',
      postedByDisplayName: '',
      postedon: '',
      priority: '',
      groupName: '',
      profilePic: ''
    }).end(function (err, res) {
      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.message.should.equal('Incomplete parameters');
      res.body.should.have.property('message');
      done();
    });
  });
});

describe('Post message route', function () {
  beforeEach(function (done) {
    _chai2.default.request(_server2.default).post('/users/signin').send({
      email: 'alec_hartmann94@yahoo.com',
      password: 'Password1'
    }).end(function () {
      done();
    });
  });

  it('should return 200 for logged in users with correct parameters', function (done) {
    _chai2.default.request(_server2.default).post('/group/-Kwetw__qC1ogqKZDAx7/message').send({
      messageBody: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      groupId: '-Kwetw__qC1ogqKZDAx7',
      postedBy: '',
      postedByDisplayName: '6OWdy7WUyoSqxYoKSUkUIMI8ZWr2',
      postedon: new Date().toLocaleString('en-GB'),
      priority: 'critical',
      groupName: 'Denesik - Stiedemann',
      profilePic: ''
    }).end(function (err, res) {
      res.status.should.equal(200);
      res.body.should.be.a('object');
      res.body.message.should.equal('Message successfully added');
      res.body.should.have.property('message');
      done();
    });
  });
});

describe('Get users read message route', function () {
  before(function (done) {
    _chai2.default.request(_server2.default).post('/users/signout').end(function () {
      done();
    });
  });

  it('should return 401 for users that are not logged in', function (done) {
    _chai2.default.request(_server2.default).get('/group/-Kwetw__qC1ogqKZDAx7/messages/-KweuV1BV76xb5ZNh9n9/usersRead').end(function (err, res) {
      res.status.should.equal(401);
      res.body.should.be.a('object');
      res.body.message.should.equal('Please log in to see who has read the message');
      res.body.should.have.property('message');
      done();
    });
  });
});

describe('Get users read message route', function () {
  beforeEach(function (done) {
    _chai2.default.request(_server2.default).post('/users/signin').send({
      email: 'alec_hartmann94@yahoo.com',
      password: 'Password1'
    }).end(function () {
      done();
    });
  });

  it('should return 200 for users that are logged in', function (done) {
    _chai2.default.request(_server2.default).get('/group/-Kwetw__qC1ogqKZDAx7/messages/-KweuV1BV76xb5ZNh9n9/usersRead').end(function (err, res) {
      res.status.should.equal(200);
      res.body.should.be.a('object');
      res.body.should.have.property('usersRead');
      res.body.usersRead.should.be.a('array');
      done();
    });
  });
});

describe('Get users not in group route', function () {
  before(function (done) {
    _chai2.default.request(_server2.default).post('/users/signout').end(function () {
      done();
    });
  });

  it('should return 401 for users that are not logged in', function (done) {
    _chai2.default.request(_server2.default).get('/group/-Kwetw__qC1ogqKZDAx7/notusers').end(function (err, res) {
      res.status.should.equal(401);
      res.body.should.be.a('object');
      res.body.message.should.equal('Please log in to see a list of users not in group');
      res.body.should.have.property('message');
      done();
    });
  });
});

describe('Get users not in group route', function () {
  beforeEach(function (done) {
    _chai2.default.request(_server2.default).post('/users/signin').send({
      email: 'alec_hartmann94@yahoo.com',
      password: 'Password1'
    }).end(function () {
      done();
    });
  });
  it('should return 200 for users that are logged in', function (done) {
    _chai2.default.request(_server2.default).get('/group/-Kwetw__qC1ogqKZDAx7/notusers').end(function (err, res) {
      res.status.should.equal(200);
      res.body.should.be.a('object');
      res.body.should.have.property('userNotInGroup');
      res.body.userNotInGroup.should.be.a('array');
      done();
    });
  });
});