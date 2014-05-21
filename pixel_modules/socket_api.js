/*
PixelJS 2 Module - SocketAPI -for faster connexion than http :)
// Socket io events prefixed by "api_"
by mininao
http://maxenceaici.fr
*/
var _ = require("underscore");
var EventEmitter = require('events').EventEmitter;

var init = function(app, core, io) {
	io.on('connection', function(socket){
		socket.on('api_coordinates_get', function (msg) {
	    	socket.emit(core.getByCoords(msg.x,msg.y););
		});	
		socket.on('api_coordinates_set', function (msg) {
	    	socket.emit(core.setByCoords(msg.x,msg.y,msg.name,msg.color););
		});			
	});	
}
exports.init = init;