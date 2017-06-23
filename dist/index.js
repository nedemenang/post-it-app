'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactRouterDom = require('react-router-dom');

var _App = require('./components/App');

var _App2 = _interopRequireDefault(_App);

var _Signup = require('./components/Signup');

var _Signup2 = _interopRequireDefault(_Signup);

var _AppAPI = require('./utils/AppAPI');

var _AppAPI2 = _interopRequireDefault(_AppAPI);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//AppApI.getUsers();

(0, _reactDom.render)(_react2.default.createElement(
     _reactRouterDom.BrowserRouter,
     null,
     _react2.default.createElement(
          _reactRouterDom.Switch,
          null,
          _react2.default.createElement(_reactRouterDom.Route, { path: '/', component: _App2.default }),
          _react2.default.createElement(_reactRouterDom.Route, { path: '/signup', component: _Signup2.default })
     )
), document.getElementById('app'));