var sortByProperty = function (property) {
    return function (x, y) {
        return ((y[property] === x[property]) ? 0 : ((y[property] > x[property]) ? 1 : -1));
    };
};

servers = serverlist[0]["response"]["servers"];

function connecttoserver(ip){
  window.location.href = "steam://connect/" + ip
}

function filltable(){
  servers.sort(sortByProperty('players'));
  for(var i = 0; i < servers.length; i++) {
      var currentserver = servers[i];
      serverid = String(i);
      serverip = currentserver["addr"];
      servername = currentserver["name"];
      servermap = currentserver["map"];
      serverplayers = String(currentserver["players"]) + "/" + String(currentserver["max_players"]);
      if (currentserver["players"] > 0){
        $("tbody").append('<tr><td>' + serverip + '</td><td>' + servername + '</td><td>' + servermap + '</td><td>' + serverplayers + '</td><td><button class="btn btn-primary" onclick="connecttoserver('+ serverip +')">Connect</button></td></tr>');
    };
  };
};
