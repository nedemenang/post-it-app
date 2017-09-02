import request from 'supertest';
// import express from 'express';
// import bodyParser from 'body-parser';
// import server from '../server';
import serve from '../server';

// const request = supertest.agent(serve);
jest.unmock('axios');
// const app = express();
// serve.use(bodyParser.urlencoded({ extended: true }));
// serve.use(bodyParser.json());

describe('SignUp Route', () => {
  beforeEach((done) => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    setTimeout(() => {
       // console.log('inside timeout');
      done();
    }, 500);
  });

  it('should return 401 response when user enters invalid email address', (done) => {
    // index(app);
    request(serve)
      .post('/users/signup')
      .send({
        userName: 'invalidUser',
        email: 'invalidUserEmail',
        password: 'invalidPassword'
      })
      .expect(401)
      .then((result) => {
        console.log(result.body.message);
        expect(result.body.message).toBe('Please insert a valid email address');
        done();
      })
      .catch((error) => {
        done.fail(error);
      });
  });

  it('should return 401 response when user doesnt put email address', (done) => {
    request(serve)
      .post('/users/signup')
      .send({
        email: '',
        password: 'validPassword',
        userName: '',
        photoURL: '',
        phoneNo: ''
      })
      .expect(401)
      .then((result) => {
        // console.log(result.body.message);
        expect(result.body.message).toContain('Error occured');
        done();
      })
      .catch((err) => {
        done.fail(err);
      });
  });

  it('should return 200 response when user enters valid email address', (done) => {
    request(serve)
      .post('/users/signup')
      .send({
        email: 'cedemenang500@gmail.com',
        password: 'validPassword',
        userName: 'validUser',
        photoURL: '',
        phoneNo: ''
      })
      .expect(200)
      .then((result) => {
        console.log(`From failing test ${result.body.message}`);
        expect(result.body.message).toBe('Please insert a valid email address');
        done();
      })
      .catch((err) => {
        done.fail(err);
      });
  });
});
