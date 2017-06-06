import supertest from 'supertest';
import should from 'should';
import mocha from 'mocha';
 // const port = process.env.PORT || 3000;

const server = supertest.agent('http://localhost:3000');

describe('API test signin route', () => {
  // beforeEach((done) => {
    // In our tests we use the test db

   // done();
  // });

  afterEach((done) => {
    server
    .post('/users/signout')
    .end(() => {
      done();
    });
  });

  it('should return 200 for valid username and password', (done) => {
    server
.post('/users/signin')
.send({ email: 'udo.udoson@gmail.com', password: 'password' })
.expect('Content-type', /json/)
.expect(200)
.end((err, res) => {
  res.status.should.equal(200);
  done();
});
  });


  it('should return 500 for invalid username and password', (done) => {
    server
.post('/users/signin')
.send({ email: 'invalid.user@gmail.com', password: 'password' })
.expect('Content-type', /json/)
.expect(500)
.end((err, res) => {
  res.status.should.equal(500);
  done();
});
  });
});


describe('API test create new group route', () => {
  it('should return 403 for when users are not logged in', (done) => {
    server
.post('/group')
.send({ groupname: 'Test Group Name' })
.expect('Content-type', /json/)
.expect(403)
.end((err, res) => {
  res.status.should.equal(403);
  done();
});
  });
});

describe('API test create new group route', () => {
  beforeEach((done) => {
    server
    .post('/users/signin')
    .send({ email: 'udo.udoson@gmail.com', password: 'password' })
    .expect('Content-type', /json/)
    .end(() => {
      done();
    });
  });

  it('should return 200 for when users are logged in', (done) => {
    server
.post('/group')
.send({ groupname: 'Valid Test Group Name' })
.expect('Content-type', /json/)
.expect(200)
.end((err, res) => {
  res.status.should.equal(200);
  res.body.message.should.equal('New group successfully created');
  done();
});
  });
});


describe('API test for sign out route', () => {
  it('should return 200 for successful signout', (done) => {
    server
.post('/users/signout')
.expect(200)
.end((err, res) => {
  res.status.should.equal(200);
  res.body.message.should.equal('User successfully signed out.');
  done();
});
  });
});

describe('API test for adding user to group route', () => {
  beforeEach((done) => {
    server
    .post('/users/signin')
    .send({ email: 'udo.udoson@gmail.com', password: 'password' })
    .expect('Content-type', /json/)
    .end(() => {
      done();
    });
});


});
