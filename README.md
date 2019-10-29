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
- open two terminals: one in the root folder and one in the api folder, make sure you have **Node, NPM  and Angular CLI 7** installed

In the api folder do:
- give the command ```meteor npm install```  (this presumes you already have installed Meteor on your system, see https://www.meteor.com/install)
- when installation is finished give the command ```meteor``` (this will finish the setup and start the server)

In the root folder you do
- give the command ```npm install```, and after installation has finished
- build the client side Meteor Bundle with ```npm run bundle-meteor-client:local```.
- start angular with the command ```npm run start``` or ```ng serve```
- the application will be running at http://localhost:4200/
- you can login as admin user with meteoradmin / asdf1234

### Main dependencies are
- Meteor (version 1.8.1)
- Angular (version 7.2, version 8 uses rxjs version 6.4 which does not play well with meteor-rxjs)
- Meteor-rxjs (version 1.4.1)
- meteor-client-bundler
- angular2-meteor-polyfills
- meteor-node-stubs
- various @type packages (see both package.json files)

The following imports are included in the main entry files of the client application (src/main.ts and src/test.ts)
```
import { Meteor } from 'meteor/meteor';
import 'angular2-meteor-polyfills';
import './meteor-bundles/meteor-client.local';
```

The last two dependencies (angular2-meteor-polyfills and meteor-node-stubs) are taken over from other projects. I didn't check 
yet if and why they are really needed. 

### Typescript
The most difficult part in setting up this project was getting rid of typescript complaining about dependencies.
I have taken ideas and input from various sides until I finally had a version that would compile. Unfortunately,
I didn't exactly note down which steps I followed to arrive there. At least some of the parts are:

 - include @types/meteor only in Meteor's package.json and not in Angular's. Angular Cli knows about meteor typings 
 by a reference to the api-folder in ```src/typings.d.ts```;
 - manually adding some meteor-related types in ```api/typings.d.ts```
 
 
 

## Use of Meteor Accounts

One of the prime reasons to choose for Meteor is its account system. 
TODO: more explanation will follow here



## Miscellaneous

### Html file type association in Webstorm
Because of the mixed nature of the project (Meteor and Angular), the association of html file type with Angular is not 
automatically create and even sometimes gets lost in Webstorm.

To fix this, adjust the following in Settings:

    Editor - File Types - Angular Html Template -> add pattern *.html
