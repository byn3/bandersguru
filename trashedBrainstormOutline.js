var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json())

var port = 8080;
var uuidv4 = require('uuid/v4');

let sessions = {};
let globalProgress;
let globalChoices;


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
let scenarios = (Object.keys(json));

// paste and run in terminal -- node server.js
// then open another terminal and run any of the following examples
// that i pasted above http methods or routes

// paste in terminal -- curl 127.0.0.1:8080/scenarios
app.get('/scenarios', function(req, res) {
  console.log('To choose a game, please paste this in a terminal: curl -d "scenario=\'BandersGuru\'" -X POST http://localhost:8080/game');
  res.send('scenarios: ["' + scenarios + '"]\n');
})
// ex output: response should be scenarios: ["BandersGuru"],
//  it should print out ALL games if there was more though, not just banders



// paste in terminal-- curl -d "scenario='BandersGuru'" -X POST http://localhost:8080/game
app.post('/game', function(req, res) {
  console.log("You have made a new session. To see available choices, curl http://localhost:8080/game/{YOURgameID}");
  let id = uuidv4();
  let session = {
    id: id,
    scenario: req.body.scenario,
    currentStep: "initial"
  };
  sessions[id] = session;
  //  this lists all key and values. output format not pretty?
  // res.send(Object.entries(session) + '\n');
  stringy = ""
  for (let [key, value] of Object.entries(session)) {
    // res.send(key);
    stringy += (key + ': ' + value + ',\n');
  }
  res.send(stringy);
});
// id will vary but example output I have is...
// id: fbd3219c-ac65-4016-be76-ec201ff4e21c,
// scenario: 'BandersGuru',
// currentStep: initial,


// paste in terminal-- curl http://localhost:8080/game/{id}
app.get("/game/:id", (req, res) => {
  console.log("Look through the choices, First line is 0, second is 1, etc.");
  console.log("Example input is-- curl -d \"choiceIndex=0\" -X POST http://localhost:8080/game/{YOURgameID}");

  temp = sessions[req.params.id];
  // console.log(temp);
  // console.log(temp.currentStep);
  choices = json;
  // console.log(choices)
  // console.log(choices[scenarios]);
  // console.log(choices["BandersGuru"]); also works
  // console.log(choices[scenarios].nodes)
  // console.log(choices[scenarios].nodes.initial)
  stringy2 = ""
  for (let [key, value] of Object.entries(choices[scenarios].nodes.initial.choices)) {
    // res.send(key);
    // stringy2 += (key + ': ' + value["line"] + ',\n');
    stringy2 += ('"line": "' + value["line"] + '",\n');
  }

  globalChoices = Object.entries(choices[scenarios].nodes.initial.choices);
  // console.log(globalChoices); // all choices
  // console.log("p");
  // console.log(globalChoices[0]); //first choice, enter office
  // console.log("pp");
  // console.log(globalChoices[1]); // second choice, run away in opp direction
  // console.log("ppp");
  // console.log(globalChoices[0][0]); // returns 0, the initial
  // console.log("pppp");
  // console.log(globalChoices[0][1]); // returns first step, enter office and the contents
  // console.log("pppp");
  // console.log(globalChoices[0][1].line); // returns enter the line from first choice


  // console.log(choices[scenarios].nodes.initial.choices)
  // console.log(stringy2);

  let progress = {
    id: req.params.id,
    scenario: scenarios,
    currentStep: temp.currentStep,
    choices: stringy2
  };

  globalProgress = progress;
  let progressString = "id: \"" + globalProgress['id'] + "\" \n"
      + "scenario: \"" + globalProgress['scenario'] + "\" \n"
      + "currentStep: \"" + globalProgress['currentStep'] +"\" \n"
      + "choices: [ " + globalProgress['choices'] + "] \n";


      let poop = JSON.stringify(poop);
  res.send(poop);
});

// this will output something like :
// {"id":"e20b7fb3-0d72-4c7d-84c8-e4f62b4ea0d8","scenario":["BandersGuru"],"currentStep":"initial","choices":"\"line\": \"Enter the office\",\n\"line\": \"Run away in the opposite direction\",\n"}




// EXAMPLE: INPUT:: curl -d "choiceIndex=0" -X POST http://localhost:8080/game/458a92b7-ca95-47d9-a26d-7b1ce8090f84
app.post("/game/:id", (req, res) => {
  let choiceMade = req.body.choiceIndex;
  let transition = "failure";
  let TEMP = globalProgress["currentStep"]
  // console.log("aaa");
  // transition = globalChoices[choiceMade]['goto'];
  // console.log(transition);
  globalChoices = Object.entries(json[scenarios].nodes);
  console.log("1");
  console.log(globalChoices);
  globalChoices = globalChoices[TEMP];
  console.log("2");
  console.log(globalChoices);
  globalChoices = globalChoices[TEMP][choiceMade];
  console.log("aweaa2");
  transition = globalChoices[0][choiceMade].goto;
  console.log(transition);


  // else if (globalProgress['currentStep'] == "2") {
  //   if (choiceMade == 3) {
  //     globalChoices = Object.entries(json[scenarios].nodes["two"].choices);
  //     transition = globalChoices[0][3].goto;
  //   }
  // }


  stringy3 = ""
  globalProgress["currentStep"] = transition;


  if (globalProgress["currentStep"] == "initial") {
    for (let [key, value] of Object.entries(choices[scenarios].nodes.initial.choices)) {
      stringy3 += ("line : " + value["line"] + '",\n');
    }
  }
  else if (globalProgress["currentStep"] == "1") {
    for (let [key, value] of Object.entries(choices[scenarios].nodes["1"].choices)) {
      stringy3 += ("line : " + value["line"] + '",\n');
    }
  }
  else if (globalProgress["currentStep"] == "2") {
    for (let [key, value] of Object.entries(choices[scenarios].nodes["2"].choices)) {
      stringy3 += ("line : " + value["line"] + '",\n');
    }
  }

  let progress = {
    id: req.params.id,
    scenario: scenarios,
    currentStep: transition,
    choices: stringy3
  };
  globalProgress = progress;

  let progressString = "id: \"" + globalProgress['id'] + "\" \n"
      + "scenario: \'" + globalProgress['scenario'] + "\" \n"
      + "currentStep: \"" + globalProgress['currentStep'] +"\" \n"
      + "choices: [ " + globalProgress['choices'] + "] \n";

  res.send(progressString);

});



let server = app.listen(8080, function() {
  let host = server.address().address
  let port = server.address().port

  console.log("app listening to http://%s:%s", host, port)
  console.log("To get started, please type this in another terminal-- curl 127.0.0.1:8080/scenarios")
})
