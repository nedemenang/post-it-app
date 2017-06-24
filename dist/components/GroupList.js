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

var _Group = require('./Group');

var _Group2 = _interopRequireDefault(_Group);

var _materialUi = require('material-ui');

var _MuiThemeProvider = require('material-ui/styles/MuiThemeProvider');

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _getMuiTheme = require('material-ui/styles/getMuiTheme');

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

var _colors = require('material-ui/styles/colors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//import Subheader from 'material-ui/Subheader';


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

var GroupList = function (_Component) {
  _inherits(GroupList, _Component);

  _createClass(GroupList, [{
    key: 'handleToggle',
    value: function handleToggle() {
      (0, _jquery2.default)('.group-form').slideToggle();
      //this.props.errors = '';
    }
  }]);

  // groupClicked() {
  // console.log('click me jooorr')
  // }

  function GroupList(props) {
    _classCallCheck(this, GroupList);

    var _this = _possibleConstructorReturn(this, (GroupList.__proto__ || Object.getPrototypeOf(GroupList)).call(this, props));

    _this.handleToggle = _this.handleToggle.bind(_this);
    // this.groupClicked = this.groupClicked.bind(this);
    _this.state = {};
    return _this;
  }

  _createClass(GroupList, [{
    key: 'render',
    value: function render() {
      //console.log(this.props.groups)
      return _react2.default.createElement(
        'div',
        { className: 'bottomMargin' },
        _react2.default.createElement(
          _MuiThemeProvider2.default,
          { muiTheme: muiTheme },
          _react2.default.createElement(
            _materialUi.Card,
            null,
            _react2.default.createElement(
              _materialUi.List,
              null,
              _react2.default.createElement(
                _materialUi.Subheader,
                null,
                _react2.default.createElement(
                  'strong',
                  null,
                  'Group List'
                )
              ),
              this.props.groups.map(function (group, i) {
                return _react2.default.createElement(_Group2.default, { group: group, key: i });
              })
            ),
            _react2.default.createElement(
              'button',
              { className: 'button', onClick: this.handleToggle },
              'Create New Group'
            )
          )
        )
      );
    }
  }]);

  return GroupList;
}(_react.Component);

exports.default = GroupList;