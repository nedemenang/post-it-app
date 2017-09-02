import express from 'express';
import bodyParser from 'body-parser';
import corsPrefetch from 'cors-prefetch-middleware';
import imagesUpload from 'images-upload-middleware';
import http from 'http';
import dotenv from 'dotenv';
import sockio from 'socket.io';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleWare from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config';


import indexRoute from './Routes/index';

dotenv.load();
const app = express();
const server = http.Server(app);
const io = new sockio(server);
const port = process.env.PORT || 3000;

// if (process.env.NODE_ENV === 'development') {
const compiler = webpack(webpackConfig);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(webpackMiddleWare(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}));
app.use(webpackHotMiddleware(compiler));
// }

app.use('/static', express.static('./server/static'));
app.use(corsPrefetch);

app.post('/notmultiple', imagesUpload(
    './server/static/files',
    'http://localhost:3000/static/files'
));

io.on('connection', (socket) => {
  // connections.push(socket);
  console.log('Connected');
  socket.on('disconnect', () => {
    console.log('Disconnected');
  });
});

indexRoute(app, io);

export { app };

server.listen(port, () => {
  console.log(`We are live on ${port}`);
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../Client/public/index.html'));
});

// module.exports = app;
export default app;
