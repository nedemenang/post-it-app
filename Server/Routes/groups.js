import groupController from '../Controllers/groups';

module.exports = (app, firebase, io) => {
  app.post('/group', (res, req) => {
    groupController.create(res, req, firebase);
  });

  app.post('/group/:groupId/user', (res, req) => {
    groupController.addUser(res, req, firebase);
  });

  app.post('/group/:groupId/message', (res, req) => {
    groupController.postMessage(res, req, firebase, io);
  });

  app.get('/group/:groupId/messages/:messageId/usersRead', (res, req) => {
    groupController.userReadMessages(res, req, firebase);
  });

  app.get('/group/:groupId/notusers', (res, req) => {
    groupController.usersNotInGroups(res, req, firebase);
  });
};
