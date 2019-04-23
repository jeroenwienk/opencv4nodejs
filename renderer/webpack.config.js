const webpack = require('webpack');
const path = require('path');

module.exports = {
  target: 'electron-renderer',
  mode: 'development',
  devtool: 'source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './app/index.js'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    alias: {
      opencv4nodejs: path.resolve(__dirname, 'node_modules/opencv4nodejs')
    },
    extensions: ['.js', '.json', '.node']
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: path.join(__dirname, 'app'),
        //exclude: /(node_modules|bower_components)/,
        loader: [
          'react-hot-loader/webpack',
          'babel-loader']
      },
      {
        test: /\.node$/,
        loader: 'node-loader'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 3000,
    hot: true,
    historyApiFallback: true
  },
  stats: {
    warningsFilter: warning => {
      // Critical dependency
      return RegExp("node_modules/opencv4nodejs/lib/cv.js").test(warning);
    }
  }
};
