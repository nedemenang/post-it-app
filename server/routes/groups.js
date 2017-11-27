import Groups from '../controllers/Groups';
import Validator from '../utilities/Validator';

module.exports = (app, firebase, io) => {
  app.post('/group', Validator, (req, res) => {
    Groups.create(req, res, firebase);
  });

  app.post('/group/remove', Validator, (req, res) => {
    Groups.removeUser(req, res, firebase);
  });

  app.post('/group/:groupId/user', Validator, (req, res) => {
    Groups.addUser(req, res, firebase);
  });

  app.post('/group/:groupId/message', Validator, (req, res) => {
    Groups.postMessage(req, res, firebase, io);
  });

  app.get('/group/:groupId/messages/:messageId/usersRead',
  Validator, (req, res) => {
    Groups.getUserReadMessages(req, res, firebase);
  });

  app.get('/group/:groupId/notusers', Validator, (req, res) => {
    Groups.getUsersNotInGroups(req, res, firebase);
  });
};
