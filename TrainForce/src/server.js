const http = require('http');
const fs = require('fs');
const socketio = require('socket.io');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const index = fs.readFileSync('TrainForce.html');

const onRequest = (request, response) => {
	response.writeHead(200, {'Content-Type': 'text/html'});
	response.write(index);
	response.end();
};

var id = 0;
var room = "room1";

const app = http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);

const io = socketio(app);

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
