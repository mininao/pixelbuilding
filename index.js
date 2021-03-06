/*
PixelJS 2 Main file
by mininao
http://maxenceaici.fr
*/

/* 1. Declarations */
var _ = require("underscore");
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
app.set('view engine', 'ejs');

var core = require('./pixel_modules/core');

io.set('log level', 1);
server.listen(process.env.PORT || 1337);

/* 2. Modules */
/* 2.1 Module: http_api */
var http_api = require('./pixel_modules/http_api.js');
http_api.init(app, core);

/* 2.2 Module: client */
var client = require('./pixel_modules/client.js');
client.init(app, core, io);

/* 2.3 Module: socket_api */
var socket_api = require('./pixel_modules/socket_api.js');
socket_api.init(app, core, io);

/* 2.4 Module: music */
var music = require('./pixel_modules/music.js');
music.init(app, core, io);

/* 2.4 Module: lib */
var lib = require('./pixel_modules/lib.js');
lib.init(app,express);

/* 3. Tests */

app.use('/pixel/test', express.static(__dirname + '/test'));

app.route('/pixel/ping').all(function(req, res, next) {
  res.send('pong');
}); 

/* 4. Logging*/

core.ee.on('update', function(currentScreen){
	console.log('update, id:' + currentScreen.id);
});
core.ee.on('reset', function(){
	console.log('reset');
});

/* 5. WIP Stuff */

