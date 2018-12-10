const request = require('request');
const http = require('http');
const path = require('path');
const fs = require('fs');

fs.readFile('./index.html', function (err, html) {
    if (err) {
        console.log(err);
    };
    newhtml = String(html).replace("RELATIVEPATHTOSERVERS.JS", path.resolve("./servers.js"))
        http.createServer(function(request, response) {
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write(newhtml);
        response.end();
    }).listen(8000);
});

var url = 'https://api.steampowered.com/IGameServersService/GetServerList/v1/?key=BE1A5A14AFCE6171E750266745ACD0B3&filter=\\appid\\674020';

function updateserverlist(){
  request.get(url, function (error, response, body) {
    fs.writeFile("./servers.js", "var serverlist = [" + body + "]", function(err) {
      if(err) {
          console.log(err);
      }
      console.log("SERVER LIST UPDATED");
    });
  });
};

updateserverlist();
