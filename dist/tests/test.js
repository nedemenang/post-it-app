'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _should = require('should');

var _should2 = _interopRequireDefault(_should);

var _mocha = require('mocha');

var _mocha2 = _interopRequireDefault(_mocha);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const port = process.env.PORT || 3000;

var server = _supertest2.default.agent('http://localhost:3000');

describe('API test signin route', function () {
  // beforeEach((done) => {
  // In our tests we use the test db

  // done();
  // });

  afterEach(function (done) {
    server.post('/users/signout').end(function () {
      done();
    });
  });

  it('should return 200 for valid username and password', function (done) {
    server.post('/users/signin').send({ email: 'udo.udoson@gmail.com', password: 'password' }).expect('Content-type', /json/).expect(200).end(function (err, res) {
      res.status.should.equal(200);
      done();
    });
  });

  it('should return 500 for invalid username and password', function (done) {
    server.post('/users/signin').send({ email: 'invalid.user@gmail.com', password: 'password' }).expect('Content-type', /json/).expect(500).end(function (err, res) {
      res.status.should.equal(500);
      done();
    });
  });
});

describe('API test create new group route', function () {
  it('should return 403 for when users are not logged in', function (done) {
    server.post('/group').send({ groupname: 'Test Group Name' }).expect('Content-type', /json/).expect(403).end(function (err, res) {
      res.status.should.equal(403);
      done();
    });
  });
});

describe('API test create new group route', function () {
  beforeEach(function (done) {
    server.post('/users/signin').send({ email: 'udo.udoson@gmail.com', password: 'password' }).expect('Content-type', /json/).end(function () {
      done();
    });
  });

  it('should return 200 for when users are logged in', function (done) {
    server.post('/group').send({ groupname: 'Valid Test Group Name' }).expect('Content-type', /json/).expect(200).end(function (err, res) {
      res.status.should.equal(200);
      res.body.message.should.equal('New group successfully created');
      done();
    });
  });
});