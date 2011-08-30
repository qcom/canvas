// Module Dependencies

var express = require('express');
var stylus = require('stylus');
var nib = require('nib');
var sio = require('socket.io');

var app = express.createServer();

// Configuration

function compile (str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
};

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public', compile: compile }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

// Routes

app.get('/', function (req, res) {
  res.render('index', {
	  layout: false
	});
});

// Socket.IO

var io = sio.listen(app);

io.sockets.on('connection', function(socket){
	socket.on('drawClick', function(data){
		socket.broadcast.emit('draw', {
			x: data.x,
			y: data.y,
			type: data.type
		});
	});
});

// Listen

app.listen(80);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);