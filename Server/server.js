// import * as dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import corsPrefetch from 'cors-prefetch-middleware';
import imagesUpload from 'images-upload-middleware';
import http from 'http';
import sockio from 'socket.io';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleWare from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import indexRoute from './Routes/index';

require('dotenv').config();
// dotenv.load();

require('es6-promise').polyfill();

const app = express();
const server = http.Server(app);
const io = new sockio(server);
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV !== 'production') {
  const webpackConfig = require('../webpack.config');
  const compiler = webpack(webpackConfig);
  app.use(webpackMiddleWare(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
  }));
  app.use(webpackHotMiddleware(compiler));


  app.use('/static', express.static('./Server/static'));
  app.use(corsPrefetch);

  app.post('/profilePictures', imagesUpload(
    './server/static/files',
    `${__dirname}/static/files`
));
} else {
  const webpackConfig = require('../../webpack.config.prod.js');
  const compiler = webpack(webpackConfig);
  app.use(webpackMiddleWare(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
  }));
  app.use('/static', express.static('../Server/static'));
  app.use(corsPrefetch);

  app.post('/profilePictures', imagesUpload(
      './server/static/files',
      `${__dirname}/static/files`
  ));
}
io.on('connection', (socket) => {
  socket.on('disconnect', () => {
  });
});

indexRoute(app, io);

export { app };

server.listen(port, () => {
  console.log(`We are live on ${port}`);
});

app.get('/*', (req, res) => {
  if (process.env.NODE_ENV !== 'production') {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  } else {
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
  }
});

// module.exports = app;
export default io;

