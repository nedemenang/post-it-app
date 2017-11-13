'use strict';

var _config = require('../Utilities/config');

var _config2 = _interopRequireDefault(_config);

var _users = require('./users');

var _users2 = _interopRequireDefault(_users);

var _groups = require('./groups');

var _groups2 = _interopRequireDefault(_groups);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (app, io) {
  // USER API ENDPOINTS
  (0, _users2.default)(app, _config2.default, io);
  // GROUP API ENDPOINTS
  (0, _groups2.default)(app, _config2.default, io);
};