/*
PixelJS 2 Module - HTTP APIs

by mininao
http://maxenceaici.fr
*/
var _ = require("underscore");
var EventEmitter = require('events').EventEmitter;

var init = function(app, core) {
	app.get('/pixel/http_api/register', function(req, res){
	  var currentScreen = core.register(req.query.x,req.query.y, req.query.name, req.query.color);
	  res.jsonp(currentScreen);
	});

	app.get('/pixel/http_api/screen/:screen', function(req, res){
	  var currentScreen = core.get(req.params.screen);
	  if(_.isUndefined(currentScreen)) {
	  	res.status(404).send("Screen not found");
	  } else {
	  	res.jsonp(currentScreen);
	  }
	});

	app.post('/pixel/http_api/screen/:screen', function(req, res){
	  var currentScreen = core.get(req.params.screen);
	  if(_.isUndefined(currentScreen)) {
	  	res.status(404).send("screen not found");
	  } else {
	  	core.set(req.params.screen, req.query.x,req.query.y, req.query.name, req.query.color);
	  	res.jsonp(currentScreen);
	  }
	});

	app.get('/pixel/http_api/coordinates/:x/:y', function(req, res){
	  var selectedScreens = core.getByCoords(req.params.x, req.params.y);
	  if(_.isEmpty(selectedScreens)) {
	  	res.status(404).send("No Screens at these coordinates");
	  } else {
	  	res.jsonp(selectedScreens);
	  }
	});

	app.post('/pixel/http_api/coordinates/:x/:y', function(req, res){
	  var selectedScreens = core.getByCoords(req.params.x, req.params.y);
	  if(_.isEmpty(selectedScreens)) {
	  	res.status(404).send("No Screens at these coordinates");
	  } else {
	  	core.setByCoords(req.params.x, req.params.y, req.query.name, req.query.color);
	  	res.jsonp(selectedScreens);
	  }
	});

	app.get('/pixel/http_api/screens', function(req, res){
	  res.jsonp(core.all());
	});

	app.post('/pixel/http_api/reset', function(req, res){
	  res.jsonp(core.reset());
	});


}
exports.init = init;