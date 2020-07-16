const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
var cors = require('cors');
const path = require('path');

const userRouter = require('./routers/userRoutes');
const { assignSocketId, removeUser } = require('./utils/users');
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

  // Listen from login event
  socket.on('login', (options, callback) => {

    // Assign the socket id to the user
    const user = assignSocketId(options.name, socket.id);

    // Return the new user object with socket id
    callback(user);

    // Notify all connections that a new user has joined
    socket.broadcast.emit('userJoined');
  });

  // Listen to message event
  socket.on('message', (options, callback) => {
    
    // Add the new message to the chat list
    const message = addMessage(socket.id, options.receiver, options.message);

    // Notify receiver about he new message
    socket.broadcast.to(options.receiver).emit('message', message);

    // Return the message to the sender
    callback(message);
  });

  socket.on('disconnect', () => {
    // Remove the user one he gets disconnected
    removeUser(socket.id);

    // Notify connection that the user collection has changed
    socket.broadcast.emit('userDisconnected');
  });
});

// Start the server and listen to incoming connections
server.listen(port, () => {
  console.log('Server is up on port ' + port);
});
