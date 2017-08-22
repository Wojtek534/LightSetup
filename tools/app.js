let express = require('express');
let chalk = require('chalk');
let path = require('path');
let webpack = require('webpack');
let config = require('../webpack.config');

let app = express();
let compiler = webpack(config);
let port = 3000;

// Virtual bundle
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));
// Send index as front page
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});
// Send folder files to localhost
app.use(express.static('src'));
// Add some cool green log
app.listen(port, function () {
  console.log(chalk.green('App running on port ' + port));
});
