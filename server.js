

var express = require('express');
var app = express();
const uuidv4 = require('uuid/v4');


var fs = require("fs"),
    json;

function readJsonFileSync(filepath, encoding){

    if (typeof (encoding) == 'undefined'){
        encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath, encoding);
    return JSON.parse(file);
}

function getConfig(file){

    var filepath = __dirname + '/' + file;
    return readJsonFileSync(filepath);
}

//assume that config.json is in application root

json = getConfig('scenarios.json');

// response after a curl 127.0.0.1:8080/scenarios is scenarios: ["BandersGuru"]
scenarios = (Object.keys(json));

app.get('/scenarios', function (req, res) {
   res.send("scenarios: [" + scenarios + "]\n");
})

app.post('/game', function (req, res) {
  id = uuidv4();
  res.send(id)
})


var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("app listening to http://%s:%s", host, port)
})
