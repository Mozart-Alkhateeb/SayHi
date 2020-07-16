const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
var cors = require('cors');
const path = require('path');
const userRouter = require('./routers/userRoutes');
const { assignSocketId } = require('./utils/users');
const { addMessage } = require('./utils/messages');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(cors());
const port = 3000;

// public folder to serve files
const publicDirectoryPath = path.join(__dirname, '../public');

// Serve and accept json
app.use(express.json());
app.use(express.static(publicDirectoryPath));

// import user routes
app.use(userRouter);

// listen to connections on socket.io
io.on('connection', (socket) => {
  console.log(`new connection - ${socket.id}`);

  socket.on('login', (options, callback) => {
    const user = assignSocketId(options.name, socket.id);
    callback(user);
    //socket.join(socket.id)

    socket.broadcast.emit('userJoined');
  });

  socket.on('message', (options, callback) => {
    const message = addMessage(socket.id, options.receiver, options.message);
    //socket.join(options.receiver);
    console.log('options');
    console.log(options);
    socket.broadcast.to(options.receiver).emit('message', message);
    callback(message);
  });

  socket.on('disconnect', () => {
    console.log(`disconnected - ${socket.id}`);
  });
});

// Start the server and listen to incoming connections
server.listen(port, () => {
  console.log('Server is up on port ' + port);
});
