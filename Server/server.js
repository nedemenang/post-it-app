import express from 'express';
import bodyParser from 'body-parser';
import corsPrefetch from 'cors-prefetch-middleware';
import imagesUpload from 'images-upload-middleware';
import sockio from 'socket.io';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleWare from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config';


import controllers from './controllers/postItController';

const app = express();
const port = process.env.PORT || 3000;
const compiler = webpack(webpackConfig);
const connections = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(webpackMiddleWare(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}));
app.use(webpackHotMiddleware(compiler));


app.use('/static', express.static('./server/static'));
app.use(corsPrefetch);

app.post('/notmultiple', imagesUpload(
    './server/static/files',
    'http://localhost:3000/static/files'
));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../Client/public/index.html'));
});


const server = app.listen(port, () => {
  console.log(`We are live on ${port}`);
});

const io = sockio(server);

io.on('connection', (socket) => {
  connections.push(socket);
  console.log(`Connected: ${connections.length} socket(s) connected...`);
  // socket.on('disconnect', () => {
   // console.log('Disconnected');
 // });
});

controllers(app, io);
