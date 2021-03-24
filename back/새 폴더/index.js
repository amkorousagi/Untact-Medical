// index.js

var express   = require('express');
var app       = express();
var fs        = require('fs'); // 1

app.set('view engine', 'ejs');

// Routes
app.use('/', require('./afewfwa'));

// Port setting
var port = 3000;
app.listen(port, function(){
  var dir = './uploadedFiles';
  if (!fs.existsSync(dir)) fs.mkdirSync(dir); // 2

  console.log('server on! http://localhost:'+port);
});