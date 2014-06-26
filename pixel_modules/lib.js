/*
PixelJS 2 Module - Easy external use libraries

by mininao
http://maxenceaici.fr
*/
var _ = require("underscore");
var EventEmitter = require('events').EventEmitter;

var app, express;

var init = function(Papp, Pexpress) {
	app = Papp;
	express = Pexpress;
	app.use('/pixel/lib', express.static(__dirname + '/lib'));
}
exports.init = init;