import express from 'express';
import bodyParser from 'body-parser';
import controllers from './controllers/postItController';
import path from 'path';

import webpack from 'webpack';
import webpackMiddleWare from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config';

const app = express();
const port = process.env.PORT || 3000;
const compiler = webpack(webpackConfig);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(webpackMiddleWare(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}));
app.use(webpackHotMiddleware(compiler));

controllers(app);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../Client/public/index.html'));
});


app.listen(port, () => {
  console.log(`We are live on ${port}`);
});
