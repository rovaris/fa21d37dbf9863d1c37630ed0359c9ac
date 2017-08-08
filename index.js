var http = require('http');
var express = require('express');
var ecstatic = require('ecstatic');
 
var app = express();

app.use(ecstatic({ root: __dirname + '/static' }));

http.createServer(app).listen(8000);
 
console.log('Application listening on 8000');
