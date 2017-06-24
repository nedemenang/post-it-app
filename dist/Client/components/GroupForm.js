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

var GroupForm = function (_Component) {
  _inherits(GroupForm, _Component);

  _createClass(GroupForm, [{
    key: 'submit',
    value: function submit(event) {
      event.preventDefault();

      console.log(dateCreated);

      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1; //January is 0!
      var yyyy = today.getFullYear();

      if (dd < 10) {
        dd = '0' + dd;
      }

      if (mm < 10) {
        mm = '0' + mm;
      }

      today = mm + '/' + dd + '/' + yyyy;

      var groupname = this.refs.group.value.trim();
      var dateCreated = today;

      var group = {
        groupname: groupname,
        datecreated: dateCreated
      };

      _AppActions2.default.createGroup(group);
      //this.setState({error : AppStore.getErrors()});
      //console.log(AppStore.getErrors());
      this.refs.group.value = '';
      (0, _jquery2.default)('.group-form').slideToggle();
    }
  }]);

  function GroupForm(props) {
    _classCallCheck(this, GroupForm);

    var _this = _possibleConstructorReturn(this, (GroupForm.__proto__ || Object.getPrototypeOf(GroupForm)).call(this, props));

    _this.state = {};
    _this.submit = _this.submit.bind(_this);
    return _this;
  }

  _createClass(GroupForm, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'bottomMargin' },
        _react2.default.createElement(
          'form',
          { onSubmit: this.submit, className: 'group-form' },
          _react2.default.createElement('input', { type: 'text', className: 'form-control', ref: 'group', placeholder: 'Please type group name. Press enter to submit' }),
          _react2.default.createElement(
            'p',
            null,
            this.props.errors
          )
        )
      );
    }
  }]);

  return GroupForm;
}(_react.Component);

exports.default = GroupForm;