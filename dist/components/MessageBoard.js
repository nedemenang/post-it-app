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

var _GroupList = require('./GroupList');

var _GroupList2 = _interopRequireDefault(_GroupList);

var _UserList = require('./UserList');

var _UserList2 = _interopRequireDefault(_UserList);

var _MessageList = require('./MessageList');

var _MessageList2 = _interopRequireDefault(_MessageList);

var _MessageForm = require('./MessageForm');

var _MessageForm2 = _interopRequireDefault(_MessageForm);

var _GroupForm = require('./GroupForm');

var _GroupForm2 = _interopRequireDefault(_GroupForm);

var _AppAPI = require('../utils/AppAPI');

var _AppAPI2 = _interopRequireDefault(_AppAPI);

var _AppStore = require('../stores/AppStore');

var _AppStore2 = _interopRequireDefault(_AppStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getAppState() {
  return {
    errors: _AppStore2.default.getErrors(),
    success: _AppStore2.default.getSuccess(),
    loggedInUser: _AppStore2.default.getLoggedInUser(),
    registeredUser: _AppStore2.default.getRegisteredUser(),
    users: _AppStore2.default.getUsersInGroup(),
    groups: _AppStore2.default.getUserGroups(),
    messages: _AppStore2.default.getGroupMessages(),
    selectedGroupId: _AppStore2.default.getSelectedGroupId()
  };
}

var MessageBoard = function (_Component) {
  _inherits(MessageBoard, _Component);

  _createClass(MessageBoard, [{
    key: 'getInitialState',
    value: function getInitialState() {
      return getAppState();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      //console.log(this.state.loggedInUser);
      _AppAPI2.default.getUserGroups();
      _AppStore2.default.addChangeListener(this._onChange.bind(this));
    }
  }, {
    key: 'componentUnmount',
    value: function componentUnmount() {
      _AppStore2.default.removeChangeListener(this._onChange.bind(this));
    }
  }]);

  function MessageBoard(props) {
    _classCallCheck(this, MessageBoard);

    //AppActions.receiveUserGroups();

    var _this = _possibleConstructorReturn(this, (MessageBoard.__proto__ || Object.getPrototypeOf(MessageBoard)).call(this, props));

    _this.state = getAppState();
    //console.log(this.state.loggedInUser);
    return _this;
  }

  _createClass(MessageBoard, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(
          'div',
          { className: 'leftColumn' },
          _react2.default.createElement(_GroupList2.default, { groups: this.state.groups }),
          _react2.default.createElement(_GroupForm2.default, null),
          _react2.default.createElement(_UserList2.default, { users: this.state.users })
        ),
        _react2.default.createElement(
          'div',
          { className: 'rightColumn' },
          _react2.default.createElement(_MessageList2.default, { messages: this.state.messages }),
          _react2.default.createElement(_MessageForm2.default, null)
        )
      );
    }
  }, {
    key: '_onChange',
    value: function _onChange() {
      this.setState(getAppState());
    }
  }]);

  return MessageBoard;
}(_react.Component);

exports.default = MessageBoard;