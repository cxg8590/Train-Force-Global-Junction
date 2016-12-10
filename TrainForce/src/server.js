const http = require('http');
const fs = require('fs');
const socketio = require('socket.io');
const express = require('express');
const path = require('path');
//const routes = require('routes');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const index = fs.readFileSync('client/index.html');

const onRequest = (request, response) => {
	response.writeHead(200, {'Content-Type': 'text/html'});
	response.write(index);
	response.end();
};


var id = 0;
var room = "room1";

const app = express();
const server = app.listen(port);
const io = require('socket.io').listen(server);

app.configure(
  /*app.set('views', __dirname + '/views'),
  app.set('view engine', 'jade'),
  app.use(express.favicon()),
  app.use(express.logger('dev')),
  app.use(express.static(__dirname + '/public')),
  app.use(express.bodyParser()),
  app.use(express.methodOverride()),
  app.use(app.router)*/
);


//app.get('/', routes.index);
console.log(`Listening on 127.0.0.1: ${port}`);

/*const app = http.createServer(onRequest).listen(port);
const exp = express();
exp.use('/TF', express.static(path.resolve(`${__dirname}`)));*/

//const app = http.createServer(onRequest).listen(port);
/*const app = require('express')();
const server = require('http').Server(app);
const io = require("socket.io")(server);

//console.log("index: " + index);

app.listen(port);

app.get('/', function(req, res) {
   res.sendfile(index); 
    res.send();
});
//app.use('/', express.static(path.resolve(index)));

console.log(`Listening on 127.0.0.1: ${port}`);
//console.log(`Listening on 127.0.0.1: ${port}`);

//const io = socketio(app);
*/

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
const onJoined = (sock) => {
	const socket = sock;
	
	socket.on('join', (data) => {
		socket.join(data);
        room = data;
	});
};

const onDrw = (sock) => {
	const socket = sock;
	
	socket.on('draw', (data) => {
		io.sockets.in(room).emit('update', data);
	});
};

const onDisconnect = (sock) => {
	const socket = sock;
	socket.on('disconnect', () => {
		socket.leave(room);
	});
};

io.sockets.on('connection', (socket) => {
	console.log('started');
	
	onJoined(socket);
	onDrw(socket);
	onDisconnect(socket);
});
