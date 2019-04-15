# bandersguru

## What is this?

Similar to the old Goosebumps books, Bandersguru, or any other choose your own adventure game, this project was meant to emulate that. Basically with 2 terminals and cURLing, one could play out the story that is written inside the scenarios.json file included. The logic and game is finished but the story could be expanded upon. This app uses Javascript, NodeJS, and ExpressJS. It mainly handles GET and POST requests via specific routes.

## How to run

* git clone this repo, cd into it
* npm install
* node server.js
* open another terminal and follow the directions  

Documentation is in server.js file or in the terminal as you go along.    
The goal of this was to learn how to use express and node in order to complete a take home assignment for a startup.  
I had to complete the mandatory tasks with tools I was not familiar with.   
It is mostly done. Need to fix error handling and some edge cases.  

## Mandatory tasks

Using a router, add these routes to the server:

- `GET` `/scenarios` where the scenarios are the top level key in `scenarios.json`

```
{
  "scenarios": [
    "BandersGuru"
  ]
}
```
- `POST`  `/game` which allows to start a game given a scenario name as JSON and returns the ID of a game.

```
{
  "id": "ec6a7bd0-4f45-11e9-9f9d-2dcc58927dae",
  "scenario": "BandersGuru",
  "currentStep": "initial"
}
```
- `GET` `/game/:id` which allows one to get a game by ID.
```
{
  "id": "derp",
  "scenario": "BandersGuru",
  "currentStep": "initial",
  "choices": [
    {
      "line": "Enter the office"
    },
    {
      "line": "Run away in the opposite direction"
    }
  ]
}
```
- `POST` `/game/:id` which allows one to choose one of the possible answer to a question and returns the following one, given the index of the selected answer. (ie: `initial` -> select `choice @index 1`  ->`node#1` and so on..)


*Payload*
``` 
{
    "choiceIndex": 0
}
```

*Response*
```
{
  "id": "derp",
  "scenario": "BandersGuru",
  "currentStep": "1",
  "choices": [
    {
      "line": "Start doing the backpack-kid dance to impress them."
    },
    {
      "line": "Tell them that Android is clearly better than Apple and that whoever would argue the contrary is completely insane."
    },
    {
      "line": "Say \" Hi! I'm #name#."
    }
  ]
}
```

At this point the game should be playable by *cURL*.


## Future implementations: 

#### Easy

- Use babel to transpile to use modern features (`import/export`...)
- Add tests with a test framework (`jasmine`, `mocha`, `jest`...)
- Linter + prettier (`eslint` + `prettier`) using the `Standard` convention

#### Medium:

- Create a basic UI for the game. No React/no Vue. Vanilla like a boss.
- Plug-in a database such as `Mongo` or `Postgre` instead of putting everything in memory.

#### Hard:

- Use an ORM (`sequelize`...)

#### God:

- Run everything on docker-compose with live-reload. Now that's a real dev workflow!
- ES6+ is too easy. Do everything in Reason.
- Do your own scenario *:)*
