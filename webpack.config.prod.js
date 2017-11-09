const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const config = {
  entry: [
    path.join(__dirname, './Client/index.jsx')
  ],
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        apiKey: JSON.stringify(process.env.APIKEY),
        authDomain: JSON.stringify(process.env.AUTHDOMAIN),
        databaseURL: JSON.stringify(process.env.DATABASEURL),
        projectId: JSON.stringify(process.env.PROJECTID),
        storageBucket: JSON.stringify(process.env.STORAGEBUCKET),
        messagingSenderId: JSON.stringify(process.env.MESSAGESENDERID)
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
