"use strict";

var httpServer = require('http-server')
  , path = require('path');

var server = httpServer.createServer({root: path.resolve(__dirname, "app")});
server.listen(8081);

