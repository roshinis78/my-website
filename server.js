var express = require("express");
const path = require('path');
var https = require("https");

var app = express();

app.use(express.static("."));

app.use(express.static(path.join(__dirname, 'intro', 'build')));
app.get('/intro', function(req, res) {
  res.sendFile(path.join(__dirname, 'intro', 'build', 'index.html'));
});

var server = app.listen(8081, function() {
  var port = process.env.PORT;
  console.log("Server started!");
});
