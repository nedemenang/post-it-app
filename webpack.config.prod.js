const dotenv = require('dotenv');
const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

dotenv.load();
const config = {
  entry: [
    path.join(__dirname, './client/index.jsx')
  ],
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist/client'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: false
    }),
    new HtmlWebpackPlugin({
      title: 'Production',
      template: './client/public/index.html',
      inject: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        APIKEY: JSON.stringify(process.env.APIKEY),
        AUTHDOMAIN: JSON.stringify(process.env.AUTHDOMAIN),
        DATABASEURL: JSON.stringify(process.env.DATABASEURL),
        PROJECTID: JSON.stringify(process.env.PROJECTID),
        STORAGEBUCKET: JSON.stringify(process.env.STORAGEBUCKET),
        MESSAGESENDERID: JSON.stringify(process.env.MESSAGESENDERID)
      }
    }),
    new UglifyJsPlugin({
      sourceMap: true
    }),
  ],
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  module: {
    loaders: [
      { loader: 'file-loader', test: /\.(ttf|png|eot|svg)$/ },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
        test: /\.(scss|css)$/,
        loader: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'url-loader?limit=10000',
          'img-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
};
module.exports = config;
