'use strict';

var _groups = require('../Controllers/groups');

var _groups2 = _interopRequireDefault(_groups);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (app, firebase, io) {
  app.post('/group', function (req, res) {
    _groups2.default.create(req, res, firebase);
  });

  app.post('/group/remove', function (req, res) {
    _groups2.default.removeUser(req, res, firebase);
  });

  app.post('/group/:groupId/user', function (req, res) {
    _groups2.default.addUser(req, res, firebase);
  });

  app.post('/group/:groupId/message', function (req, res) {
    _groups2.default.postMessage(req, res, firebase, io);
  });

  app.get('/group/:groupId/messages/:messageId/usersRead', function (req, res) {
    _groups2.default.getUserReadMessages(req, res, firebase);
  });

  app.get('/group/:groupId/notusers', function (req, res) {
    _groups2.default.getUsersNotInGroups(req, res, firebase);
  });
};