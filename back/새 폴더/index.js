// index.js

var express   = require('express');
var app       = express();
var fs        = require('fs'); // 1
var indexRoute = require("./uploadFile");

// Routes
app.use('/', require('./fileDown'));
app.use('/', require('./uploadFile'));
// Port setting
var port = 3000;
app.listen(port, function(){

  console.log('server on! http://localhost:'+port);
});