# ManageSocial Tech Task
## Resolution

Its a mobile first application
Connects users to the Twitter API and retrieves its data
Uses sessions and file-store
Its a SPA served by the server
No build tooling were produced since it wasnt required.
*Didn't produced tests for the server side, its not that there wasnt enough testable material, its a simple API
with very low sideeffects and those are mostly handled by the session middleware. Hopefully the tests on the Client may be sufficient to assert this skill.
Used [Git flow](https://danielkummer.github.io/git-flow-cheatsheet/index.html) for task management

## Requirements

* [Node.js LTS](https://nodejs.org/en/download/) version ```v8.2.1``` or greater
* [Yarn latest](https://yarnpkg.com/en/docs/install) or  [Npm latest](https://www.npmjs.com/get-npm)

## Config files 
First you need to create a environment based config file, look at `config/` folder abd you'll find a `default.vars.json` file and a `hosts/` folder, Copy and paste `default.vars.json` into the hosts folder. replace `default` in the file nameby your machine hostname. like so:

on your terminal run:
```
> cd config/
> cp default.vars.json hosts/
> hostname
MyMachineName-Lan-Example
> cd hosts
> mv default.vars.json MyMachineName-Lan-Example.vars.json

```
The config file looks like:
```
{
    "dev": {
        "publicPath": "http://localhost:8000",
        "twitterConsumerKey": "",
        "twitterConsumerSecret": "",
        "sessionSecret":""
    }
}
```

The `publicPath` is used by webpack in order to dynamically replace env urls with that.
The `twitterConsumerKey` and `twitterConsumerSecret` will be used by the server in order to connect to `Twitter`. And may be found on your [Twitter Develepers account](https://dev.twitter.com/) within a app.
The "sessionSecret" is the secret which signs off all sessions between server and client

**PLEASE NOTE**  You **MUST** provide valid information on those 4 fields.

## Installation

You may use both npm or Yarn, for the purpose of this document i'll assume you'll use **Yarn** and know the counterpart command using npm
#### Yarn
Go to the project root folder in your terminal and run
```
 yarn
```
to install all required dependecies

## Running
#### One liner starter
The easiest way of starting the project is by running:
```
yarn start
```
that will build the frontend code and create them inside the `static/` folder in the project, then alongside serving the api static files will be served too.

to use the application go to http://localhost:8000

#### Running Frontend Separately
To run the webpack frontend server in `watch` mode run:
```
yarn front
```
#### Running Server Separately
To run the Server/API as a standalone:
```
yarn server
```
PS: If you wish to run the server in watch mode please install
```
yarn global add nodemon
```
and run
```
nodemon --watch server/ --watch index.js index.js
```
## Linting 
In order to lint your whole application including test code run:
```
yarn lint
```
## Testing

#### All tests with coverage
run:
```
yarn test-all
```
#### run tests in watch mode
```
yarn jest
```

Thanks.

Lucas Rovaris
