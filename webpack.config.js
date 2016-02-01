require('dotenv').config();
var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, '/static/'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.FIREBASE_URL': JSON.stringify(process.env.FIREBASE_URL)
    }),
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      include: path.join(__dirname, 'src'),
      loaders: ['react-hot', 'babel']
    }]
  }
}
