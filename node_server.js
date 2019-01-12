const request = require('request');
const http = require('http');
const path = require('path');
const fs = require('fs');
const express = require('express');
var app = express();
const port = process.env.PORT;

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
//fs.readFile('./index.html', function (err, html) {
//    if (err) {
//        console.log(err);
//    };
//    http.createServer(function(request, response) {
//      response.writeHeader(200, {"Content-Type": "text/html"});
//      response.write(html);
//      response.end();
//    }).listen(8000);
//});

var url = 'API_KEY_HERE';

function updateserverlist(){
  request.get(url, function (error, response, body) {
    fs.writeFile("public/servers.js", "var serverlist = [" + body + "]", function(err) {
      if(err) {
          console.log(err);
      }
    });
  });
};

updateserverlist();
setInterval(updateserverlist, 2000);
