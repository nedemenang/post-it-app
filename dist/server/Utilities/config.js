'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.load();

var config = {};
if (process.env.NODE_ENV === 'test') {
  config = {
    apiKey: process.env.APIKEYTEST,
    authDomain: process.env.AUTHDOMAINTEST,
    databaseURL: process.env.DATABASEURLTEST,
    projectId: process.env.PROJECTIDTEST,
    storageBucket: process.env.STORAGEBUCKETTEST,
    messagingSenderId: process.env.MESSAGESENDERIDTEST
  };
} else {
  config = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    databaseURL: process.env.DATABASEURL,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGESENDERID
  };
}

_firebase2.default.initializeApp(config);
exports.default = _firebase2.default;