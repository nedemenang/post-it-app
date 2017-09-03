
// Require the dev-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
import * as admin from 'firebase-admin';
import server from '../server';

const account = require('../../postittest-45ed5-firebase-adminsdk-7fjno-42a736db9f');

admin.initializeApp({
  credential: admin.credential.cert(account),
  databaseURL: 'https://postittest-45ed5.firebaseio.com'
});

chai.should();


chai.use(chaiHttp);


describe('SignUp Route', () => {
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
              res.status.should.equal(401);
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              done();
            });
  });

  it('should return 200 for a valid email address', (done) => {
    chai.request(server)
            .post('/users/signup')
            .type('form')
            .send({
              email: `${Math.floor(Math.random() * 200)}@Email.com`,
              password: 'validPassword',
              userName: 'validUser',
              photoURL: 'http://localhost:3000/static/files/blank-profile-pic.png',
              phoneNo: ''
            })
            .end((err, res) => {
              res.status.should.equal(200);
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              done();
            });
  });
});
