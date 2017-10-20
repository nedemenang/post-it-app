
// Require the dev-dependencies
import chai from 'chai';
import faker from 'faker';
import chaiHttp from 'chai-http';
import server from '../server';

chai.should();

chai.use(chaiHttp);

describe('Sign up Route', () => {
  it('should return 400 for an invalid email address', (done) => {
    chai.request(server)
            .post('/users/signup')
            .send({
              userName: 'invalidUser',
              email: 'invalidUserEmail',
              password: 'invalidPassword',
              photoURL: '',
              phoneNo: ''
            })
            .end((err, res) => {
              res.status.should.equal(400);
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.message.should
              .equal('Please insert a valid email address');
              done();
            });
  });

  it('should return 400 for an empty email address', (done) => {
    chai.request(server)
            .post('/users/signup')
            .send({
              userName: '',
              email: 'invalidUserEmail',
              password: 'invalidPassword',
              photoURL: '',
              phoneNo: ''
            })
            .end((err, res) => {
              res.status.should.equal(400);
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.message.should
              .equal('Please insert a valid email address');
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
              photoURL: '',
              phoneNo: ''
            })
            .end((err, res) => {
              res.status.should.equal(400);
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.message.should
              .equal('Please insert a valid email address');
              done();
            });
  });
  it('should return 200 for correct username and password', (done) => {
    const email = faker.internet.email();
    chai.request(server)
            .post('/users/signup')
            .send({
              userName: faker.name.firstName(),
              email,
              password: 'Password1',
              photoURL: '',
              phoneNo: faker.phone.phoneNumber()
            })
            .end((err, res) => {
              res.status.should.equal(200);
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.message.should
              .equal(`Welcome ${email.toLowerCase()}. Please proceed to log in`);
              done();
            });
  });
});

describe('Sign in route', () => {
  it('should return 400 for an invalid email address', (done) => {
    chai.request(server)
    .post('/users/signin')
    .send({
      email: 'invalidEmail',
      password: 'Password1'
    })
    .end((err, res) => {
      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.equal('Please insert a valid email address');
      done();
    });
  });

  it('should return 400 for an empty email address', (done) => {
    chai.request(server)
    .post('/users/signin')
    .send({
      email: '',
      password: 'Password1'
    })
    .end((err, res) => {
      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.equal('Please insert a valid email address');
      done();
    });
  });

  it('should return 400 for an empty password', (done) => {
    chai.request(server)
    .post('/users/signin')
    .send({
      email: 'validemail@gmail.com',
      password: ''
    })
    .end((err, res) => {
      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.equal('Please insert email or password');
      done();
    });
  });

  it('should return 401  for invalid login email', (done) => {
    chai.request(server)
    .post('/users/signin')
    .send({
      email: 'Alec_Hartmann942@yahoo.com',
      password: 'Password1'
    })
    .end((err, res) => {
      res.status.should.equal(401);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.equal('Invalid email address');
      done();
    });
  });

  it('should return 401  for invalid password', (done) => {
    chai.request(server)
    .post('/users/signin')
    .send({
      email: 'Alec_Hartmann94@yahoo.com',
      password: 'Password12'
    })
    .end((err, res) => {
      res.status.should.equal(401);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.equal('Invalid Password');
      done();
    });
  });

  it('should return 200  for valid email and password', (done) => {
    chai.request(server)
    .post('/users/signin')
    .send({
      email: 'Alec_Hartmann94@yahoo.com',
      password: 'Password1'
    })
    .end((err, res) => {
      res.status.should.equal(200);
      res.body.should.be.a('object');
      res.body.user.should.be.a('object');
      res.body.should.have.property('message');
      res.body.should.have.property('user');
      done();
    });
  });
});

describe('Sign out Route', () => {
  before((done) => {
    chai.request(server)
    .post('/users/signin')
    .send({
      email: 'Alec_Hartmann94@yahoo.com',
      password: 'Password1'
    }).end(() => {
      done();
    });
  });

  it('should return 200  for valid sign out', (done) => {
    chai.request(server)
    .post('/users/signout')
    .end((err, res) => {
      res.status.should.equal(200);
      res.body.should.be.a('object');
      res.body.message.should.equal('User successfully signed out.');
      res.body.should.have.property('message');
      done();
    });
  });
});

describe('Update user profile Route', () => {
  before((done) => {
    chai.request(server)
    .post('/users/signout')
    .end(() => {
      done();
    });
  });

  it('should return 401 for users that are not logged in', (done) => {
    chai.request(server)
    .post('/users/updateUserProfile')
    .send({
      userName: faker.name.firstName(),
      photoURL: '',
      phoneNo: faker.phone.phoneNumber()
    })
    .end((err, res) => {
      res.status.should.equal(401);
      res.body.should.be.a('object');
      res.body.message.should.equal('Only logged users update profile');
      res.body.should.have.property('message');
      done();
    });
  });
});

describe('Update user profile Route', () => {
  before((done) => {
    chai.request(server)
    .post('/users/signin')
    .send({
      email: 'alec_hartmann94@yahoo.com',
      password: 'Password1'
    })
    .end(() => {
      done();
    });
  });

  it('should return 200 for logged in users', (done) => {
    const userName = faker.name.firstName();
    const phoneNo = faker.phone.phoneNumber();
    chai.request(server)
    .post('/users/updateUserProfile')
    .send({
      userName,
      photoURL: `/${userName}.jpg`,
      phoneNo
    })
    .end((err, res) => {
      res.status.should.equal(200);
      res.body.should.be.a('object');
      res.body.message.should.equal('Profile update successful!');
      res.body.should.have.property('message');
      res.body.user.displayName.should.equal(userName);
      res.body.user.photoURL.should.equal(`/${userName}.jpg`);
      done();
    });
  });
});

describe('Get group route', () => {
  before((done) => {
    chai.request(server)
    .post('/users/signout')
    .end(() => {
      done();
    });
  });

  it('should return 401 for users that are not logged in', (done) => {
    const userId = '6OWdy7WUyoSqxYoKSUkUIMI8ZWr2';
    chai.request(server)
    .get(`/user/${userId}/groups`)
    .end((err, res) => {
      res.status.should.equal(401);
      res.body.should.be.a('object');
      res.body.message.should.equal('Please log in to see a list of your groups');
      res.body.should.have.property('message');
      done();
    });
  });
});

describe('Get group route', () => {
  before((done) => {
    chai.request(server)
    .post('/users/signin')
    .send({
      email: 'alec_hartmann94@yahoo.com',
      password: 'Password1'
    })
    .end(() => {
      done();
    });
  });

  it('should return 200 for users that are logged in', (done) => {
    const userId = '6OWdy7WUyoSqxYoKSUkUIMI8ZWr2';
    chai.request(server)
    .get(`/user/${userId}/groups`)
    .end((err, res) => {
      res.status.should.equal(200);
      res.body.should.be.a('object');
      res.body.should.have.property('groups');
      done();
    });
  });
});

describe('Get group messages quick route', () => {
  before((done) => {
    chai.request(server)
    .post('/users/signout')
    .end(() => {
      done();
    });
  });

  it('should return 401 for users that are not logged in', (done) => {
    chai.request(server)
    .get('/user/6OWdy7WUyoSqxYoKSUkUIMI8ZWr2/group/-KrAwfM16qbLOig_mSOc/quickMessages')
    .end((err, res) => {
      res.status.should.equal(401);
      res.body.should.be.a('object');
      res.body.message.should.equal('Please log in to see a list of your groups messages');
      res.body.should.have.property('message');
      done();
    });
  });
});

describe('Get group messages quick route', () => {
  before((done) => {
    chai.request(server)
    .post('/users/signin')
    .send({
      email: 'alec_hartmann94@yahoo.com',
      password: 'Password1'
    })
    .end(() => {
      done();
    });
  });

  it('should return 200 for users that are logged in', (done) => {
    chai.request(server)
    .get('/user/6OWdy7WUyoSqxYoKSUkUIMI8ZWr2/group/-KrAwfM16qbLOig_mSOc/quickMessages')
    .end((err, res) => {
      res.status.should.equal(200);
      res.body.should.be.a('object');
      res.body.should.have.property('groupMessages');
      res.body.groupMessages.should.be.a('array');
      done();
    });
  });
});

describe('Get group messages route', () => {
  before((done) => {
    chai.request(server)
    .post('/users/signout')
    .end(() => {
      done();
    });
  });

  it('should return 401 for users that are not logged in', (done) => {
    chai.request(server)
    .get('/user/6OWdy7WUyoSqxYoKSUkUIMI8ZWr2/group/-KrAwfM16qbLOig_mSOc/messages')
    .end((err, res) => {
      res.status.should.equal(401);
      res.body.should.be.a('object');
      res.body.message.should.equal('Please log in to see a list of your groups messages');
      res.body.should.have.property('message');
      done();
    });
  });
});

