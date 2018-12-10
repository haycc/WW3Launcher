const request = require('request');
const http = require('http');
const path = require('path');
const fs = require('fs');
const express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

var server = app.listen(8000);
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

var url = 'https://api.steampowered.com/IGameServersService/GetServerList/v1/?key=BE1A5A14AFCE6171E750266745ACD0B3&filter=\\appid\\674020';

function updateserverlist(){
  request.get(url, function (error, response, body) {
    fs.writeFile("public/servers.js", "var serverlist = [" + body + "]", function(err) {
      if(err) {
          console.log(err);
      }
      console.log("SERVER LIST UPDATED");
    });
  });
};

updateserverlist();
setInterval(updateserverlist, 2000);
