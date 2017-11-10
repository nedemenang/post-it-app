import firebase from '../Utilities/config';
import userRoutes from './users';
import groupRoutes from './groups';

module.exports = (app, io) => {
  // USER API ENDPOINTS
  userRoutes(app, firebase, io);
  // GROUP API ENDPOINTS
  groupRoutes(app, firebase, io);
};
