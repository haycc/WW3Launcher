const request = require('request');
const http = require('http');
const path = require('path');
const fs = require('fs');
const express = require('express');
var app = express();
const port = process.env.PORT;

const SteamAPIKey = process.env.steamkey;

//testing
console.Log(process.env.steamkey);
console.Log(SteamAPIKey);

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

var url = 'https://api.steampowered.com/IGameServersService/GetServerList/v1/?key=' + SteamAPIKey + 'filter=\\appid\\674020&limit=1000';
console.Log(url);
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
