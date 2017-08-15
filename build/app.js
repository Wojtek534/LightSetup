var express = require('express');
var chalk = require('chalk');
var path = require('path');
var webpack = require('webpack')
var config = require('../webpack.config');

var app = express();
var compiler = webpack(config);
var port = 3000;

// Virtual bundle
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));
// Send index as front page
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
})
// Send folder files to localhost
app.use(express.static('src'))
// Add some cool green log
app.listen(port, function () {
  console.log(chalk.green('App running on port ' + port))
})