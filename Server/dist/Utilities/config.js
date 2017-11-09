'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _firebase = require('firebase');

var firebase = _interopRequireWildcard(_firebase);

var _dotenv = require('dotenv');

var dotenv = _interopRequireWildcard(_dotenv);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

dotenv.load();

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

firebase.initializeApp(config);
exports.default = firebase;