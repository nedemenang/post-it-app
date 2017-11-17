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
import dotenv from 'dotenv';
import indexRoute from './Routes';

dotenv.load();


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
} else {
  app.use(express.static(path.resolve(__dirname, '../client')));
}

app.use('/static', express.static(path.resolve(__dirname, './static')));
app.use(corsPrefetch);
app.post('/profilePictures',
imagesUpload('./static/files', `${__dirname}/static/files`));

io.on('connection', (socket) => {
  socket.on('disconnect', () => {
  });
});

indexRoute(app, io);

server.listen(port, () => {
  console.log(`We are live on ${port}`);
});

export default app;

app.get('/*', (req, res) => {
  if (process.env.NODE_ENV !== 'production') {
    res.sendFile(path.join(__dirname, '../Client/public/index.html'));
  } else {
    res.sendFile(path.join(__dirname, '../client/index.html'));
  }
});
