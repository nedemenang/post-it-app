import chai from 'chai';
import faker from 'faker';
import chaiHttp from 'chai-http';
import server from '../server';

chai.should();

chai.use(chaiHttp);

describe('Create group route', () => {
  before((done) => {
    chai.request(server)
    .post('/users/signout')
    .end(() => {
      done();
    });
  });

  it('should return 401 for users that are not logged in', (done) => {
    chai.request(server)
    .post('/group')
    .send({
      groupName: faker.company.companyName(),
      createdBy: 'alec_hartmann94@yahoo.com',
      dateCreated: (new Date()).toLocaleString('en-GB'),
      createdByUserId: '6OWdy7WUyoSqxYoKSUkUIMI8ZWr2',
      createdByDisplayName: 'Alec'
    })
    .end((err, res) => {
      res.status.should.equal(401);
      res.body.should.be.a('object');
      res.body.message.should.equal('Only logged users can create groups');
      res.body.should.have.property('message');
      done();
    });
  });
});

describe('Create group route', () => {
  beforeEach((done) => {
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

  it('should return 400 for empty group name or created by or date created',
  (done) => {
    chai.request(server)
    .post('/group')
    .send({
      groupName: '',
      createdBy: '',
      dateCreated: '',
      createdByUserId: '',
      createdByDisplayName: ''
    })
    .end((err, res) => {
      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.message.should.equal('Please insert groupname or createdby or datecreated');
      res.body.should.have.property('message');
      done();
    });
  });

  it('should return 201 for valid users with valid inputs', (done) => {
    chai.request(server)
    .post('/group')
    .send({
      groupName: faker.company.companyName(),
      createdBy: 'alec_hartmann94@yahoo.com',
      dateCreated: (new Date()).toLocaleString('en-GB'),
      createdByUserId: '6OWdy7WUyoSqxYoKSUkUIMI8ZWr2',
      createdByDisplayName: 'Alec'
    })
    .end((err, res) => {
      res.status.should.equal(201);
      res.body.should.be.a('object');
      res.body.message.should.equal('New group successfully created');
      res.body.should.have.property('message');
      done();
    });
  });
});

describe('Add user to group route', () => {
  before((done) => {
    chai.request(server)
    .post('/users/signout')
    .end(() => {
      done();
    });
  });

  it('should return 401 for users that are not logged in', (done) => {
    chai.request(server)
    .post('/group/-Kwetw__qC1ogqKZDAx7/user')
    .send({
      userId: '6OWdy7WUyoSqxYoKSUkUIMI8ZWr2',
      groupName: 'Denesik - Stiedemann',
      username: 'Beulah',
      email: 'Onie89@yahoo.com',
    })
    .end((err, res) => {
      res.status.should.equal(401);
      res.body.should.be.a('object');
      res.body.message.should
      .equal('Only logged users can add users to groups');
      res.body.should.have.property('message');
      done();
    });
  });
});

describe('Add user to group route', () => {
  beforeEach((done) => {
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

  it('should return 400 for incomplete parameters', (done) => {
    chai.request(server)
    .post('/group/-Kwetw__qC1ogqKZDAx7/user')
    .send({
      userId: '',
      groupName: '',
      username: '',
      email: '',
    })
    .end((err, res) => {
      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.message.should.equal('Please insert userId or groupName');
      res.body.should.have.property('message');
      done();
    });
  });

  it('should return 200 for logged in users and complete parameters',
  (done) => {
    chai.request(server)
    .post('/group/-Kwetw__qC1ogqKZDAx7/user')
    .send({
      userId: '6OWdy7WUyoSqxYoKSUkUIMI8ZWr2',
      groupName: 'Denesik - Stiedemann',
      userName: 'Beulah',
      email: 'Onie89@yahoo.com',
    })
    .end((err, res) => {
      res.status.should.equal(200);
      res.body.should.be.a('object');
      res.body.message.should.equal('User successfully added');
      res.body.should.have.property('message');
      done();
    });
  });
});

describe('Post message route', () => {
  before((done) => {
    chai.request(server)
    .post('/users/signout')
    .end(() => {
      done();
    });
  });

  it('should return 401 for users that are not logged in', (done) => {
    chai.request(server)
    .post('/group/-Kwetw__qC1ogqKZDAx7/message')
    .send({
      messageBody: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      groupId: '-Kwetw__qC1ogqKZDAx7',
      postedBy: '',
      postedByDisplayName: '6OWdy7WUyoSqxYoKSUkUIMI8ZWr2',
      postedon: (new Date()).toLocaleString('en-GB'),
      priority: 'normal',
      groupName: 'Denesik - Stiedemann',
      profilePic: ''
    })
    .end((err, res) => {
      res.status.should.equal(401);
      res.body.should.be.a('object');
      res.body.message.should
      .equal('Only logged users can add messages to groups');
      res.body.should.have.property('message');
      done();
    });
  });
});

describe('Post message route', () => {
  beforeEach((done) => {
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

  it('should return 400 for logged in users with incomplete parameters',
  (done) => {
    chai.request(server)
    .post('/group/-Kwetw__qC1ogqKZDAx7/message')
    .send({
      messageBody: '',
      groupId: '',
      postedBy: '',
      postedByDisplayName: '',
      postedon: '',
      priority: '',
      groupName: '',
      profilePic: ''
    })
    .end((err, res) => {
      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.message.should.equal('Please insert messageBody, groupId, postedBy or priority');
      res.body.should.have.property('message');
      done();
    });
  });
});

describe('Post message route', () => {
  beforeEach((done) => {
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

  it('should return 200 for logged in users with correct parameters',
  (done) => {
    chai.request(server)
    .post('/group/-Kwetw__qC1ogqKZDAx7/message')
    .send({
      messageBody: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      groupId: '-Kwetw__qC1ogqKZDAx7',
      postedBy: '',
      postedByDisplayName: '6OWdy7WUyoSqxYoKSUkUIMI8ZWr2',
      postedOn: (new Date()).toLocaleString('en-GB'),
      priority: 'critical',
      groupName: 'Denesik - Stiedemann',
      profilePic: ''
    })
    .end((err, res) => {
      res.status.should.equal(200);
      res.body.should.be.a('object');
      res.body.message.should.equal('Message successfully added');
      res.body.should.have.property('message');
      done();
    });
  });
});

describe('Get users read message route', () => {
  before((done) => {
    chai.request(server)
    .post('/users/signout')
    .end(() => {
      done();
    });
  });

  it('should return 401 for users that are not logged in', (done) => {
    chai.request(server)
    .get('/group/-Kwetw__qC1ogqKZDAx7/messages/-KweuV1BV76xb5ZNh9n9/usersRead')
    .end((err, res) => {
      res.status.should.equal(401);
      res.body.should.be.a('object');
      res.body.message.should
      .equal('Please log in to see who has read the message');
      res.body.should.have.property('message');
      done();
    });
  });
});

describe('Get users read message route', () => {
  beforeEach((done) => {
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

  it('should return 200 for users that are logged in with correct payload',
  (done) => {
    chai.request(server)
    .get('/group/-Kwetw__qC1ogqKZDAx7/messages/-Kwf_gHOQvzfwQrfU7xf/usersRead')
    .end((err, res) => {
      res.status.should.equal(200);
      res.body.should.be.a('object');
      res.body.should.have.property('usersRead');
      res.body.usersRead[0].email.should.equal('Onie89@yahoo.com');
      res.body.usersRead.length.should.equal(1);
      res.body.usersRead.should.be.a('array');
      done();
    });
  });
});

describe('Get users not in group route', () => {
  before((done) => {
    chai.request(server)
    .post('/users/signout')
    .end(() => {
      done();
    });
  });

  it('should return 401 for users that are not logged in', (done) => {
    chai.request(server)
    .get('/group/-Kwetw__qC1ogqKZDAx7/notusers')
    .end((err, res) => {
      res.status.should.equal(401);
      res.body.should.be.a('object');
      res.body.message.should
      .equal('Please log in to see a list of users not in group');
      res.body.should.have.property('message');
      done();
    });
  });
});

describe('Get users not in group route', () => {
  beforeEach((done) => {
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
    .get('/group/-KwfBymwEk1rFCAhODSq/notusers')
    .end((err, res) => {
      res.status.should.equal(200);
      res.body.should.be.a('object');
      res.body.should.have.property('userNotInGroup');
      res.body.userNotInGroup.should.be.a('array');
      done();
    });
  });
});
