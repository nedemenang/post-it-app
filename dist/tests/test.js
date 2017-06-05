'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _should = require('should');

var _should2 = _interopRequireDefault(_should);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const port = process.env.PORT || 3000;

var server = _supertest2.default.agent('http://localhost:3000');

describe('API test for post-it-app', function () {
  it('should return 200 for valid username and password', function (done) {
    server.post('/users/signin').send({ email: 'udo.udoson@gmail.com', password: 'password' }).expect('Content-type', /json/).expect(200).end(function (err, res) {
      (0, _should2.default)(res.status).equal(200);
      (0, _should2.default)(res.body.message).equal('Welcome null');
      done();
    });
  });
});