
// Require the dev-dependencies
import chai from 'chai';
import faker from 'faker';
import chaiHttp from 'chai-http';
import admin from 'firebase-admin';
import server from '../server';

const account = require('../../postittest-45ed5-firebase-adminsdk-7fjno-42a736db9f');

admin.initializeApp({
  credential: admin.credential.cert(account),
  databaseURL: 'https://postittest-45ed5.firebaseio.com'
});


chai.should();


chai.use(chaiHttp);


describe('Sign up Route', () => {
  it('should return 401 for an invalid email address', (done) => {
    chai.request(server)
            .post('/users/signup')
            .send({
              userName: 'invalidUser',
              email: 'invalidUserEmail',
              password: 'invalidPassword',
              photoURL: 'http://localhost:3000/static/files/blank-profile-pic.png',
              phoneNo: ''
            })
            .end((err, res) => {
              res.status.should.equal(400);
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              done();
            });
  });

  it('should return 401 for an empty email address', (done) => {
    chai.request(server)
            .post('/users/signup')
            .send({
              userName: '',
              email: 'invalidUserEmail',
              password: 'invalidPassword',
              photoURL: 'http://localhost:3000/static/files/blank-profile-pic.png',
              phoneNo: ''
            })
            .end((err, res) => {
              res.status.should.equal(400);
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              done();
            });
  });

  it('should return 401 for an empty password field', (done) => {
    chai.request(server)
            .post('/users/signup')
            .send({
              userName: '',
              email: 'invalidUserEmail',
              password: '',
              photoURL: 'http://localhost:3000/static/files/blank-profile-pic.png',
              phoneNo: ''
            })
            .end((err, res) => {
              res.status.should.equal(400);
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              done();
            });
  });
});

