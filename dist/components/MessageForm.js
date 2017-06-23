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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MessageForm = function (_Component) {
  _inherits(MessageForm, _Component);

  _createClass(MessageForm, [{
    key: 'submit',
    value: function submit(event) {
      event.preventDefault();

      var messagebody = this.refs.message.value.trim();
      var priority = this.ref.priority.value();
      var postedon = Date.now;

      var message = {
        message: messagebody,
        postedon: postedon,
        priority: priority,
        groupId: this.props.selectedGroupId
      };

      _AppActions2.default.addMessage(message);
      //this.setState({error : AppStore.getErrors()});
      //console.log(AppStore.getErrors());
    }
  }]);

  function MessageForm(props) {
    _classCallCheck(this, MessageForm);

    var _this = _possibleConstructorReturn(this, (MessageForm.__proto__ || Object.getPrototypeOf(MessageForm)).call(this, props));

    _this.state = {};
    _this.submit = _this.submit.bind(_this);
    return _this;
  }

  _createClass(MessageForm, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'form',
          null,
          _react2.default.createElement('input', { type: 'text', className: 'form-control', ref: 'message', placeholder: 'Please type a message. Press enter to submit.' }),
          _react2.default.createElement(
            'select',
            { ref: 'priority', className: 'form-select' },
            _react2.default.createElement(
              'option',
              null,
              'Select Message Priority ....'
            ),
            _react2.default.createElement(
              'option',
              { value: 'normal' },
              'Normal'
            ),
            _react2.default.createElement(
              'option',
              { value: 'urgent' },
              'Urgent'
            ),
            _react2.default.createElement(
              'option',
              { value: 'critical' },
              'Critical'
            )
          ),
          _react2.default.createElement(
            'button',
            { className: 'messageButton', onClick: this.submit },
            'Submit'
          )
        )
      );
    }
  }]);

  return MessageForm;
}(_react.Component);

exports.default = MessageForm;