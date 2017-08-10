global.Promise = require('bluebird');

const configResolver = require('./config/configResolver');

global.PROJECT_ENV = configResolver.loadConfig('dev');

const http = require('http');
const express = require('express');
const ecstatic = require('ecstatic');
const registerRoutes = require('./server/routes');
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(ecstatic({ root: __dirname + '/static' }));

registerRoutes(app);

http.createServer(app).listen(8000);
 
console.log('Application listening on 8000');
