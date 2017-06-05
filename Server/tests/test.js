import supertest from 'supertest';
import should from 'should';

 // const port = process.env.PORT || 3000;

const server = supertest.agent('http://localhost:3000');

describe('API test for post-it-app', () => {
  it('should return 200 for valid username and password', (done) => {
    server
.post('/users/signin')
.send({ email: 'udo.udoson@gmail.com', password: 'password' })
.expect('Content-type', /json/)
.expect(200)
.end((err, res) => {
  should(res.status).equal(200);
  should(res.body.message).equal('Welcome null');
  done();
});
  });
});
