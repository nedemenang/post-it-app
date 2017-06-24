'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Login = require('./Login');

var _Login2 = _interopRequireDefault(_Login);

var _AppActions = require('../actions/AppActions');

var _AppActions2 = _interopRequireDefault(_AppActions);

var _AppStore = require('../stores/AppStore');

var _AppStore2 = _interopRequireDefault(_AppStore);

var _MessageBoard = require('./MessageBoard');

var _MessageBoard2 = _interopRequireDefault(_MessageBoard);

require('../public/style.css');

var _AppBar = require('material-ui/AppBar');

var _AppBar2 = _interopRequireDefault(_AppBar);

var _MuiThemeProvider = require('material-ui/styles/MuiThemeProvider');

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _getMuiTheme = require('material-ui/styles/getMuiTheme');

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

var _colors = require('material-ui/styles/colors');

var _reactTapEventPlugin = require('react-tap-event-plugin');

var _reactTapEventPlugin2 = _interopRequireDefault(_reactTapEventPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


(0, _reactTapEventPlugin2.default)();
//import UserList from './UserList';
//import GroupList from './GroupList';
//import MessageList from './MessageList'; 

var muiTheme = (0, _getMuiTheme2.default)({
  palette: {
    primary1Color: _colors.green500,
    primary2Color: _colors.green700,
    primary3Color: _colors.green100
  }
}, {
  avatar: {
    borderColor: null
  }
});

function getAppState() {
  return {
    errors: _AppStore2.default.getErrors(),
    success: _AppStore2.default.getSuccess(),
    loggedInUser: _AppStore2.default.getLoggedInUser(),
    registeredUser: _AppStore2.default.getRegisteredUser(),
    isAuthenticated: _AppStore2.default.getIsAuthenticated()
  };
}

var App = function (_Component) {
  _inherits(App, _Component);

  _createClass(App, [{
    key: 'getInitialState',
    value: function getInitialState() {
      return getAppState();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      _AppStore2.default.addChangeListener(this._onChange.bind(this));
    }
  }, {
    key: 'componentUnmount',
    value: function componentUnmount() {
      _AppStore2.default.removeChangeListener(this._onChange.bind(this));
    }
  }]);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = getAppState();
    return _this;
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      //console.log(this.state.errors)
      //<Login errors = {this.state.errors} />
      //console.log(this.state.isAuthenticated);
      if (this.state.isAuthenticated == false) {
        var componentToMount = _react2.default.createElement(_Login2.default, this.state);
      } else {
        var componentToMount = _react2.default.createElement(_MessageBoard2.default, null);
      }

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _MuiThemeProvider2.default,
          { muiTheme: muiTheme },
          _react2.default.createElement(_AppBar2.default, { title: 'Post It App' })
        ),
        componentToMount
      );
    }
  }, {
    key: '_onChange',
    value: function _onChange() {
      this.setState(getAppState());
    }
  }]);

  return App;
}(_react.Component);

exports.default = App;