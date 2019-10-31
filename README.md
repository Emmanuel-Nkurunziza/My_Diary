[![Build Status](https://travis-ci.com/Emmanuel-Nkurunziza/My_Diary.svg?branch=develop)](https://travis-ci.com/Emmanuel-Nkurunziza/My_Diary)




#  My_Diary
> My_Diary App aims at collecting the entire spectrum of your daily thoughts and feeling, ups and downs, in a written form to keep them memorable.


## Motivation 
> After some reasonable time period, revisiting your daily thoughts and feelings will give a clear psychological picture of general trends of your thoughts and feelings and this can guide you to a prediction of your emotions, leading to better future decisions. 


## Style guide
> - [Airbnb](https://github.com/airbnb/javascript) - Javascript style guide


## Link to the pivotal tracker stories
- [Link to the pivotal tracker stories](https://www.pivotaltracker.com/n/projects/2400478)



## UI Tools and Technologies
> - Uses `HTML` as the markup language for the front-end structures.
> - Uses  `CSS` for styling the front-end structures.
> - Uses `JavaScript (ES6)` for UI functionalities on used modals and on small screen menus.


## Link to the UI
- [github-pages for UI](https://emmanuel-nkurunziza.github.io/My_Diary/UI/html/index.html)


## Server or API Tools and Technologies
> - [NodeJS](https://nodejs.org/) which is a JavaScript Runtime Environment
> - [ExpressJs](https://expressjs.com/) which is an unopinionated and minimalistic  Web Application Framework for node.js
> - `ESlint` for code linting
> - `Babel` for code transpiring from ES5 to ES6
> - [Mocha](https://mochajs.org/) which is as a JavaScript testing framework
> - [Chai](http://www.chaijs.com/) which is A BDD / TDD assertion library

## Required App Features
- Users can create an account
- User can sign in 
- Users can view all entries to their diary
- Users can view the contents of a diary entry
- Users can add entry
- Users can add or modify an entry
- Users can delete an entry

## Additional App Features
- Users can set and get daily notifications that prompt them to add an entry to their diary

## API Endpoints

| Endpoint                    | Functionality        |
| --------------------------- | -------------------- |
| POST `/auth/signup`         | user signup      |
| POST `/auth/signin`          | user signin         |
| GET `/entries`              | Get all entries      |
| GET `/entries/:entryId`    | Get specific entry   |
| POST `/entries`             | Add Entry      |
| PATCH `/entries/:entryId`  | Modify Entry      |
| DELETE `/entries/:entryId` | Delete entry      |

## Continuous Integration
> - Travis CI

## Test Coverage
> - nyc

## Git badge
> - coveralls

## Deployment
> - Heroku


## Getting Started
> - Copy of this project in your local machine:the first thing to do is to clone the gitHub repository of this project on your local machine. You will need also the: [Node Package Installer - NPM] which usually comes with Node.js

>### Installing, run server and test:
>>-A directory having the name of the repository is generates in your local machine after cloning form the gitHub, then CD to this generated repository. Then using the following command:
>>- then do the npm install, to install the node_modules which will help to run the project in your local machine.

####To Run the Server
 > npm run start

#### To Run the Test
 > npm run test


## Credits
Andela Development Team

## License
© Emmanuel Nkurunziza, 2019