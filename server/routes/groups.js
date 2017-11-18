import groupController from '../controllers/groups';

module.exports = (app, firebase, io) => {
  app.post('/group', (req, res) => {
    groupController.create(req, res, firebase);
  });

  app.post('/group/remove', (req, res) => {
    groupController.removeUser(req, res, firebase);
  });

  app.post('/group/:groupId/user', (req, res) => {
    groupController.addUser(req, res, firebase);
  });

  app.post('/group/:groupId/message', (req, res) => {
    groupController.postMessage(req, res, firebase, io);
  });

  app.get('/group/:groupId/messages/:messageId/usersRead', (req, res) => {
    groupController.getUserReadMessages(req, res, firebase);
  });

  app.get('/group/:groupId/notusers', (req, res) => {
    groupController.getUsersNotInGroups(req, res, firebase);
  });
};
