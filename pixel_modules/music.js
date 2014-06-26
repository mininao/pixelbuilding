/*
PixelJS 2 Module - Music

by mininao
http://maxenceaici.fr
*/
var _ = require("underscore");
var EventEmitter = require('events').EventEmitter;
var app, core, io;
var playingjson;
var currentTime;
var timeouts = new Array();

var changePixels = function(pixels) {
	pixels.forEach(function(pixel){
		core.setByCoords(pixel.x,pixel.y,undefined,pixel.color);
	});
} 

var cueUpdates = function(timestamp, pixels) {
	timeouts.push(setTimeout(function() {
		changePixels(pixels);
	}, timestamp));
}

var clearSongs = function() {
	timeouts.forEach(function(timeout){
		clearTimeout(timeout);
	});
}
exports.clearSongs = clearSongs;

var playSong = function(song, playfrom) {
	song.updates.forEach(function(update) {
		cueUpdates(update.timestamp - playfrom, update.pixels)
	});
}
exports.playSong = playSong;

var toSong = function(data) {
	return JSON.parse(data);
}
exports.toSong = toSong;

var init = function(Papp, Pcore, Pio) {
	app = Papp;
	core = Pcore;
	io = Pio;
	io.on('connection', function(socket){
		socket.on('music_play', function (msg) {
	    	playSong(msg.song, msg.playfrom);
		});	
		socket.on('music_stop', function (msg) {
	    	clearSongs();
		});			
	});		
}
exports.init = init;

/* Socket io api */
