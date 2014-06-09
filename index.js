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

/* 2. Module : http_api */

var http_api = require('./pixel_modules/http_api.js');
http_api.init(app, core);

/* 3. Module : client */
var client = require('./pixel_modules/client.js');
client.init(app, core, io);

/* 3. Module : socket_api */
var socket_api = require('./pixel_modules/socket_api.js');
socket_api.init(app, core, io);

/* 5. Tests */

app.use('/pixel/test', express.static(__dirname + '/test'));

app.route('/pixel/ping').all(function(req, res, next) {
  res.send('pong');
}); 

/* 6. Logging*/

core.ee.on('update', function(currentScreen){
	console.log('update, id:' + currentScreen.id);
});
core.ee.on('reset', function(){
	console.log('reset');
});

/* 7. WIP Stuff */

