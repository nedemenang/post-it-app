const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
// import path from 'path';
// import webpack from 'webpack';

const config = {
  entry: [
    path.join(__dirname, './client/index.jsx'),
    'webpack-hot-middleware/client'
  ],
  output: {
    path: path.resolve(__dirname, './client/public'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    new Dotenv({
      path: '.env',
      safe: false,
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './client/public',
    inline: true,
    hot: true,
    port: 8080
  },
  node: {
    fs: 'empty'
  },
  module: {
    loaders: [
      { loader: 'file-loader', test: /\.(ttf|png|eot|svg)$/ },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot-loader',
          'babel-loader']
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
