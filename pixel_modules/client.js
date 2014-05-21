/*
PixelJS 2 Module - Client 
// Socket io events prefixed by "client_"
by mininao
http://maxenceaici.fr
*/
var _ = require("underscore");
var EventEmitter = require('events').EventEmitter;

var init = function(app, core, io) {
	app.get('/pixel/client', function(req, res){
		var query = "";
		if(! _.isUndefined(req.query.x)) {query += "x=" + req.query.x + "&";}
		if(! _.isUndefined(req.query.y)) {query += "y=" + req.query.y + "&";}
		if(! _.isUndefined(req.query.name)) {query += "name=" + req.query.name + "&";}
		if(! _.isUndefined(req.query.color)) {query += "color=" + req.query.color + "&";}

		res.render('connect.ejs', { query: query});
	});

	io.on('connection', function(socket){
		core.ee.on('update', function(currentScreen){
			socket.emit('client_update', currentScreen);
		});
		core.ee.on('reset', function(){
			socket.emit('client_reset');
		});
	});	
}
exports.init = init;