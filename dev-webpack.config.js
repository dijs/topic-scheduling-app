var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, '/static/dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.VOTE_THRESHOLD': JSON.stringify(process.env.VOTE_THRESHOLD),
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
