# bandersguru

## What is this?

Similar to the old Goosebumps books, Bandersguru, or any other choose your own adventure game, this project was meant to emulate that. Basically with 2 terminals and curling, one could play out the story that is written inside the data/scenarios.json file included. The logic and game is finished but the story could be expanded upon. This app uses Javascript, NodeJS, and ExpressJS. It mainly handles GET and POST requests via specific routes. There can be more visual and output improvements and I will get to it when I have the time.


This is a screenshot of what playing the game looks like in one of the terminals.
![A screen shot of what the game looks like. A text based adventure game.](https://github.com/byn3/bandersguru/blob/master/images/playingBanders.png)

___ 

This is a screenshot of the other terminal that prompts and tells the user how to play.
![A screen shot of what the node terminal looks like. It tells you how to play.](https://github.com/byn3/bandersguru/blob/master/images/node%20index.png)

## How to run

* git clone this repo, cd into it  
* npm install  
* node server.js *(You will get a line of code that you can paste to get started)*  
* open another terminal and follow the directions after each curl  

Documentation is in server.js file as well as in the terminal as you go along.    
The goal of this was to learn how to use ExpressJS. 

## HTTP Requests and Endpoints


- `GET` `/scenarios` where you get which scenarios are supported. Currently only one, BandersGuru.

- `POST`  `/game` which allows a user to start a game, given a scenario name as JSON, and returns the ID of a game, which game, and the current progress.

- `GET` `/game/:id` which allows a user to get a game info by ID.

- `POST` `/game/:id` which allows the user to choose one of the possible answer to a question and returns the following result, given the index of the selected answer. ChoiceIndex = 0 is the first path you can take out of the options.

At this point the game is playable by *cURL*.


## Bugs:
Missing some error handling when out of index. Should just not throw error and reprompt user that they.



## Future implementations: 
- Reset command, a frontend, and deployed on servers. Make the console output prettier.
- Use babel to transpile to use modern features (`import/export`...)
- Add tests with a test framework (`jasmine`, `mocha`, `jest`...)
- Linter + prettier (`eslint` + `prettier`) using the `Standard` convention

- Create a basic UI for the game.
- Plug-in a database such as `Mongo` or `Postgre` instead of putting everything in memory.

- Use an ORM (`sequelize`...)

- Run everything on docker-compose with live-reload. Now that's a real dev workflow!
- Do your own scenario *:)*
