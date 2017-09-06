'use strict';

var App = require('./components/App');
var React = require('react');
var ReactDOM = require('react-dom');
//var AppAPI = require('./utils/appAPI.js');


ReactDOM.render(React.createElement(App, null), document.getElementById('app'));