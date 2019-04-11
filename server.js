var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json())

var port = 8080;
var uuidv4 = require('uuid/v4');

let fs = require("fs"),
  json;

// read json file function
function readJsonFileSync(filepath, encoding) {
  if (typeof(encoding) == 'undefined') {
    encoding = 'utf8';
  }
  let file = fs.readFileSync(filepath, encoding);
  return JSON.parse(file);
}

// get right file
function getConfig(file) {
  let filepath = __dirname + '/' + file;
  return readJsonFileSync(filepath);
}

// assign json variable to the read data.
json = getConfig('scenarios.json');
// store the keys of json (scenarios) in variable scenarios
const scenarios = (Object.keys(json));
let session = {};
let id;
let globalChoices = [];
let globalLines = [];


// paste and run in terminal -- node server.js
// then open another terminal and run any of the following examples
// that i pasted above http methods or routes

// paste in terminal -- curl 127.0.0.1:8080/scenarios
app.get('/scenarios', function(req, res) {
  console.log('To choose a game, please paste this in a terminal: curl -d "scenario=BandersGuru" -X POST http://localhost:8080/game');
  res.send('{\n  scenarios: ' + JSON.stringify(scenarios, null, 2) + '\n}');
})
// ex output: response should be scenarios: ["BandersGuru"],
//  it should print out ALL games if there was more though, not just banders



// paste in terminal-- curl -d "scenario=BandersGuru" -X POST http://localhost:8080/game
app.post('/game', function(req, res) {
  console.log("You have made a new session. To see available choices, curl http://localhost:8080/game/{YOURgameID}");
  if (req.body.scenario != "BandersGuru") {
    res.send("\n\n I ONLY ACCEPT scenario=BandersGuru currently!!! \n\n");
  }
  id = uuidv4();
  session = {
    id: id,
    scenario: req.body.scenario,
    currentStep: "initial"
  };
  //  this lists all key and values. output format not pretty?
  // res.send(Object.entries(session) + '\n');
  stringy = ""
  for (let [key, value] of Object.entries(session)) {
    // res.send(key);
    stringy += (key + ': ' + value + ',\n');
  }
  res.send(JSON.stringify(session, null, 2) + "\n");
  // res.send(stringy);
});
// id will vary but example output I have is...
// id: fbd3219c-ac65-4016-be76-ec201ff4e21c,
// scenario: 'BandersGuru',
// currentStep: initial,


// paste in terminal-- curl http://localhost:8080/game/{id}
app.get("/game/:id", (req, res) => {
  console.log("Look through the choices, First line is 0, second is 1, etc.");
  console.log("Example input is-- curl -d \"choiceIndex=0\" -X POST http://localhost:8080/game/{YOURgameID}");

  if (req.params.id != session.id) {
    res.send("\n\nWRONG ID IDIOT\n\n");
  }

  globalChoices = Object.entries(json[scenarios].nodes.initial.choices);
  globalLines = [];
  for (let [key, value] of Object.entries(json[scenarios].nodes.initial.choices)) {
    globalLines.push(value["line"]);
  }

  let story = json[scenarios].nodes.initial.story;
  session = {
    id: req.params.id,
    scenario: scenarios,
    currentStep: session.currentStep,
    story: story,
    choices: globalLines
  };

  res.send(JSON.stringify(session, null, 2));
});

// this will output something like :
// {"id":"e20b7fb3-0d72-4c7d-84c8-e4f62b4ea0d8","scenario":["BandersGuru"],"currentStep":"initial","choices":"\"line\": \"Enter the office\",\n\"line\": \"Run away in the opposite direction\",\n"}




// EXAMPLE: INPUT:: curl -d "choiceIndex=0" -X POST http://localhost:8080/game/458a92b7-ca95-47d9-a26d-7b1ce8090f84
// this will output the session and more choices.
// you either keep choosing choices or you fail/win
app.post("/game/:id", (req, res) => {

  if (req.params.id != session.id) {
    res.send("\n\nWRONG ID IDIOT\n\n");
  }
  let choiceMade = req.body.choiceIndex;
  let transition = "failure";
  let story = "";

  transition = globalChoices[choiceMade][1].goto;
  globalChoices["currentStep"] = transition;
  globalLines = [];

  if (session["currentStep"] == "success" || transition == "success") {
    res.send("\n\n WINNER WINNER CHICKEN DINNER\n\n");
  }
  if (transition == "failure") {
    console.log("ya lost man\n\n");
    res.send("You lose\n\n");
  } else if (transition == "one") {
    for (let [key, value] of Object.entries(json[scenarios].nodes.one.choices)) {
      globalLines.push(value["line"]);
    }
    story = json[scenarios].nodes.one.story;
    globalChoices = Object.entries(json[scenarios].nodes.one.choices)
  } else if (transition == "two") {
    for (let [key, value] of Object.entries(json[scenarios].nodes.two.choices)) {
      globalLines.push(value["line"]);
    }
    story = json[scenarios].nodes.two.story;
    globalChoices = Object.entries(json[scenarios].nodes.two.choices)
  }

  progress = {
    id: req.params.id,
    scenario: scenarios,
    currentStep: transition,
    story: story,
    choices: globalLines
  };
  session = progress;
  if (transition == "failure" || transition == "success") {
        ;
  }
  else {
    res.send(JSON.stringify(session, null, 2));
  }
});

let server = app.listen(8080, function() {
  let host = server.address().address
  let port = server.address().port

  console.log("app listening to http://%s:%s", host, port)
  console.log("To get started, please type this in another terminal-- curl 127.0.0.1:8080/scenarios")
})
