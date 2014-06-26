/*
PixelJS 2 Module - Core functions
Pixel storage, update events, get/set, register
by mininao
http://maxenceaici.fr
*/
var _ = require("underscore");
var EventEmitter = require('events').EventEmitter;

var screens = new Array();


/**** REGISTER, GET, SET ******/
var register = function(x, y, name, color) {
	x=parseInt(x);
	y=parseInt(y);	
	var newScreen = {
	    x		: x,
	    y		: y,
	    name	: name,
	    color	: color,
	    id		: _.uniqueId('screen_')
  	};
  	_.defaults(newScreen, {name: "A screen", color: "black", x: 0, y: 0});
  	screens.push(newScreen);
  	ee.emit('create',newScreen);
  	return newScreen;
}
exports.register = register;

var all = function() {
	return screens;
}
exports.all = all;

var reset = function() {
	screens.length = 0;
	ee.emit('reset');
	return screens;
}
exports.reset = reset;

/* Getters */
var get = function(id) {
  	return _.findWhere(screens, {id: id});
}
exports.get = get;

var getByCoords = function(x, y) {
	x=parseInt(x);
	y=parseInt(y);
	var selectedScreens = _.where(screens, {x:x, y:y});
	return selectedScreens;
}
exports.getByCoords = getByCoords;
/* End of getters */

/* Setters */
var set = function(id, Qx, Qy, name, color) {
	x=parseInt(Qx);
	y=parseInt(Qy);	
	var currentScreen = _.findWhere(screens, {id: id});
	if ( _.isUndefined(currentScreen) ) {
        return; // Check if screen exists
    } else {
    	if (! _.isUndefined(Qx)) 	{currentScreen.x = x;}
    	if (! _.isUndefined(Qy)) 	{currentScreen.y = y;}
     	if (! _.isUndefined(name)) 	{currentScreen.name = name;}
    	if (! _.isUndefined(color)) {currentScreen.color = color;}
		
		ee.emit('update',currentScreen);
		return currentScreen;
  	}
}
exports.set = set;

var setByCoords = function(x, y, name, color) {
	x=parseInt(x);
	y=parseInt(y);	
	var selectedScreens = _.where(screens, {x:x, y:y});
	if ( _.isEmpty(selectedScreens) ) {
		console.log("setByCoords : Coords not found");
        return; // Check if screen exists
    } else {
    	_.each(selectedScreens, function(currentScreen){
	    	if (! _.isUndefined(name)) 	{currentScreen.name = name;}
	    	if (! _.isUndefined(color)) {currentScreen.color = color;}
			ee.emit('update',currentScreen);
    	});
    }
		return selectedScreens;
}
exports.setByCoords = setByCoords;
/* End of Setters */

/* Stats & utilities */
//TODO

/****** UPDATES & EVENTS *******/
var ee = new EventEmitter();
ee.setMaxListeners(50);
exports.ee = ee;
