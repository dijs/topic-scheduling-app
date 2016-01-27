var path = require('path')
var express = require('express')
var webpack = require('webpack')
var config = require('./webpack.config')

var app = express()
var compiler = webpack(config)

var PORT = process.env.PORT || 3000

app.use('/static', express.static(path.join(__dirname, 'static')))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(PORT, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + PORT)
})
