# Meteor Angular Demo

## Introduction
This repository gives an opinionated view of how Meteor and Angular can work together to build SPA applications. 
It uses the Meteor build system only to build the server and uses Angular Cli to build the client.
Meteor modules that are needed in the client are compiled as a single bundle 
with the help of [Meteor Client Bundler](https://github.com/Urigo/meteor-client-bundler).

NOTE: this demo is still a work in progress, so it has rough edges and too little explanation at the moment.
A clean install (withouth demo files) with the same setup is available as [Meteor-angular-starter](https://github.com/JanvanCasteren/meteor-angular-starter).

### (Meteor-)Rxjs: reactive programmming
This demo tries to follow a purely reactive programming style. It uses [Meteor-Rxjs](https://github.com/Urigo/meteor-rxjs) to expose
Mongo collections as Observables in the client and further uses as little as possible Meteor-specific code in de client. 

### Minimise the use of Meteor
The kind of applications I make are usually prototype-like applications that have an uncertain future. 
The might be taken over by another company that doesn't want to use Meteor. For this reason, I try to keep the 
dependency on Meteor as small as possible, using the following guidelines:

#### Client
- do not use any Mongo functionality in the client other than ```ObservableCollection.find({})``` (exception is the use of the accounts system);
- data manipulation must only be done through Meteor Methods;
- Meteor-aware code should only exist in services, not in components

#### Server
- use Meteor-specific code only for querying and updating collections. Do not use Meteor packages for other tasks (like validation);

## How to install and use
- clone the repository
- cd in to the application folder and give the command ```npm install```
- cd into the api-folder and give the command ```meteor``` (this presumes you already have installed Meteor on your system, see https://www.meteor.com/install)
- after meteor finished installing install the npm modules for meteor with ```meteor npm install``` (give this command inside the api folder)
- cd back into the root folder
- build the client side meteor bundle with ```npm run bundle-meteor-client:local```.
- start meteor in the api folder with the command ```meteor```
- start angular in the root folder with the command ```npm run start``` or ```ng serve```
- the application will be running at http://localhost:4200/
- you can login as admin user with meteoradmin / asdf1234


## Use of Meteor Accounts

One of the prime reasons to choose for Meteor is its account system. 
TODO: more explanation will follow here



## Miscellaneous

### Html file type association in Webstorm
Because of the mixed nature of the project (Meteor and Angular), the association of html file type with Angular is not 
automatically create and even sometimes gets lost in Webstorm.

To fix this, adjust the following in Settings:

    Editor - File Types - Angular Html Template -> add pattern *.html
