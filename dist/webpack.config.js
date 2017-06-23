'use strict';

var path = require('path');
var webpack = require('webpack');
// import path from 'path';
// import webpack from 'webpack';

var config = {
  entry: ['./Client/index.jsx', 'webpack-hot-middleware/client'],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [new webpack.NoEmitOnErrorsPlugin(), new webpack.optimize.OccurrenceOrderPlugin(), new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: './Client/public',
    inline: true,
    hot: true,
    port: 8080
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['react-hot-loader', 'babel-loader?presets[]=es2015,presets[]=react']
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  }
};
module.exports = config;