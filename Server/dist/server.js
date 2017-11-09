'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _corsPrefetchMiddleware = require('cors-prefetch-middleware');

var _corsPrefetchMiddleware2 = _interopRequireDefault(_corsPrefetchMiddleware);

var _imagesUploadMiddleware = require('images-upload-middleware');

var _imagesUploadMiddleware2 = _interopRequireDefault(_imagesUploadMiddleware);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _webpack3 = require('../../webpack.config');

var _webpack4 = _interopRequireDefault(_webpack3);

var _index = require('./Routes/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import * as dotenv from 'dotenv';
require('dotenv').config();
// dotenv.load();

require('es6-promise').polyfill();

var app = (0, _express2.default)();
var server = _http2.default.Server(app);
var io = new _socket2.default(server);
var port = process.env.PORT || 3000;

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

if (process.env.NODE_ENV !== 'production') {
  var compiler = (0, _webpack2.default)(_webpack4.default);
  app.use((0, _webpackDevMiddleware2.default)(compiler, {
    hot: true,
    publicPath: _webpack4.default.output.publicPath,
    noInfo: true
  }));
  app.use((0, _webpackHotMiddleware2.default)(compiler));

  app.use('/static', _express2.default.static('./Server/static'));
  app.use(_corsPrefetchMiddleware2.default);

  app.post('/profilePictures', (0, _imagesUploadMiddleware2.default)('./server/static/files', __dirname + '/static/files'));
} else {
  app.use('/static', _express2.default.static('../Server/static'));
  app.use(_corsPrefetchMiddleware2.default);

  app.post('/profilePictures', (0, _imagesUploadMiddleware2.default)('./server/static/files', __dirname + '/static/files'));
}
io.on('connection', function (socket) {
  socket.on('disconnect', function () {});
});

(0, _index2.default)(app, io);

exports.app = app;


server.listen(port, function () {
  console.log('We are live on ' + port);
});

app.get('/*', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, '../../Client/public/index.html'));
});

// module.exports = app;
exports.default = io;