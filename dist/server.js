'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _postItController = require('./controllers/postItController');

var _postItController2 = _interopRequireDefault(_postItController);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _webpack3 = require('../webpack.config');

var _webpack4 = _interopRequireDefault(_webpack3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = process.env.PORT || 3000;
var compiler = (0, _webpack2.default)(_webpack4.default);

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());
app.use((0, _webpackDevMiddleware2.default)(compiler, {
  hot: true,
  publicPath: _webpack4.default.output.publicPath,
  noInfo: true
}));
app.use((0, _webpackHotMiddleware2.default)(compiler));

(0, _postItController2.default)(app);

app.get('/*', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, 'index.html'));
});

app.listen(port, function () {
  console.log('We are live on ' + port);
});