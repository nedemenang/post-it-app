'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AppActions = require('../actions/AppActions');

var _AppActions2 = _interopRequireDefault(_AppActions);

require('../public/style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Signup = function (_Component) {
  _inherits(Signup, _Component);

  _createClass(Signup, [{
    key: 'signup',
    value: function signup(event) {
      // 
      event.preventDefault();
      var user = {
        email: this.refs.email.value.trim(),
        password: this.refs.password.value.trim(),
        username: this.refs.username.value.trim()
      };

      console.log(user);

      _AppActions2.default.registerUser(user);
    }
  }]);

  function Signup(props) {
    _classCallCheck(this, Signup);

    var _this = _possibleConstructorReturn(this, (Signup.__proto__ || Object.getPrototypeOf(Signup)).call(this, props));

    _this.state = {};
    _this.signup = _this.signup.bind(_this);
    return _this;
  }

  _createClass(Signup, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'login-page' },
        _react2.default.createElement(
          'div',
          { className: 'form' },
          _react2.default.createElement(
            'form',
            { className: 'register-form' },
            _react2.default.createElement('input', { type: 'text', ref: 'email', placeholder: 'email address' }),
            _react2.default.createElement('input', { type: 'password', ref: 'password', placeholder: 'password' }),
            _react2.default.createElement('input', { type: 'text', ref: 'username', placeholder: 'username' }),
            _react2.default.createElement(
              'button',
              { onClick: this.signup },
              'Sign'
            ),
            _react2.default.createElement(
              'p',
              { className: 'message' },
              'Already registered? ',
              _react2.default.createElement(
                'a',
                { href: '#' },
                'Sign In'
              )
            )
          )
        )
      );
    }
  }]);

  return Signup;
}(_react.Component);

exports.default = Signup;