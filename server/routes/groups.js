import Groups from '../controllers/Groups';

module.exports = (app, firebase, io) => {
  app.post('/group', (req, res) => {
    Groups.create(req, res, firebase);
  });

  app.post('/group/remove', (req, res) => {
    Groups.removeUser(req, res, firebase);
  });

  app.post('/group/:groupId/user', (req, res) => {
    Groups.addUser(req, res, firebase);
  });

  app.post('/group/:groupId/message', (req, res) => {
    Groups.postMessage(req, res, firebase, io);
  });

  app.get('/group/:groupId/messages/:messageId/usersRead', (req, res) => {
    Groups.getUserReadMessages(req, res, firebase);
  });

  app.get('/group/:groupId/notusers', (req, res) => {
    Groups.getUsersNotInGroups(req, res, firebase);
  });
};
