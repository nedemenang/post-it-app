'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

require('../public/style.css');

var _jquery = require('../public/jquery.js');

var _jquery2 = _interopRequireDefault(_jquery);

var _AppActions = require('../actions/AppActions');

var _AppActions2 = _interopRequireDefault(_AppActions);

var _AppStore = require('../stores/AppStore');

var _AppStore2 = _interopRequireDefault(_AppStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Login = function (_Component) {
  _inherits(Login, _Component);

  _createClass(Login, [{
    key: 'login',
    value: function login(event) {
      // 
      event.preventDefault();
      var email = this.refs.loginEmail.value.trim();
      var password = this.refs.loginPassword.value.trim();

      var user = {
        email: email,
        password: password,
        isAuthenticated: false,
        profilePic: ''
      };
      //console.log(user)
      _AppActions2.default.login(user);
      //this.setState({error : AppStore.getErrors()});
      //console.log(AppStore.getErrors());
    }
  }, {
    key: 'handleToggle',
    value: function handleToggle() {
      (0, _jquery2.default)('form').slideToggle();
      //this.props.errors = '';
    }
  }, {
    key: 'signup',
    value: function signup(event) {
      // 
      event.preventDefault();
      var user = {
        email: this.refs.email.value.trim(),
        password: this.refs.password.value.trim(),
        username: this.refs.username.value.trim()
      };

      _AppActions2.default.registerUser(user);
    }
  }, {
    key: 'signupGoogle',
    value: function signupGoogle(event) {
      // 
      event.preventDefault();
      var user = {
        email: this.refs.email.value.trim(),
        password: this.refs.password.value.trim(),
        username: this.refs.username.value.trim()
      };
      //AppActions.registerUser(user); 
    }
  }]);

  function Login(props) {
    _classCallCheck(this, Login);

    //this.state =;

    var _this = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, props));

    _this.login = _this.login.bind(_this);
    _this.signup = _this.signup.bind(_this);
    _this.handleToggle = _this.handleToggle.bind(_this);
    return _this;
  }

  _createClass(Login, [{
    key: 'render',
    value: function render() {
      //console.log(this.props.errors)
      return _react2.default.createElement(
        'div',
        { className: 'login-page' },
        _react2.default.createElement(
          'div',
          { className: 'form' },
          _react2.default.createElement(
            'form',
            { className: 'login-form' },
            _react2.default.createElement(
              'h3',
              null,
              'LOG IN'
            ),
            _react2.default.createElement('input', { type: 'text', ref: 'loginEmail', placeholder: 'email' }),
            _react2.default.createElement('input', { type: 'password', ref: 'loginPassword', placeholder: 'password' }),
            _react2.default.createElement(
              'p',
              { className: 'error' },
              this.props.errors
            ),
            _react2.default.createElement(
              'button',
              { className: 'button', onClick: this.login },
              'Log In'
            ),
            _react2.default.createElement(
              'p',
              { className: 'message' },
              'Not registered? ',
              _react2.default.createElement(
                'a',
                { onClick: this.handleToggle, href: '#' },
                'Create an account'
              )
            )
          ),
          _react2.default.createElement(
            'form',
            { className: 'register-form' },
            _react2.default.createElement(
              'h3',
              null,
              'REGISTER'
            ),
            _react2.default.createElement('input', { type: 'text', ref: 'email', placeholder: 'email address' }),
            _react2.default.createElement('input', { type: 'password', ref: 'password', placeholder: 'password' }),
            _react2.default.createElement('input', { type: 'text', ref: 'username', placeholder: 'username' }),
            _react2.default.createElement(
              'p',
              { className: 'success' },
              this.props.success
            ),
            _react2.default.createElement(
              'p',
              { className: 'error' },
              this.props.error
            ),
            _react2.default.createElement(
              'button',
              { className: 'button', onClick: this.signup },
              'Register'
            ),
            _react2.default.createElement('br', null),
            _react2.default.createElement(
              'button',
              { className: 'googleButton', onClick: this.signupGoogle },
              'Register with Google'
            ),
            _react2.default.createElement(
              'p',
              { className: 'message' },
              'Already registered? ',
              _react2.default.createElement(
                'a',
                { onClick: this.handleToggle, href: '#' },
                'Sign In'
              )
            )
          )
        )
      );
    }
  }]);

  return Login;
}(_react.Component);

exports.default = Login;