const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
var cors = require('cors');
const path = require('path');
const userRouter = require('./routers/userRoutes');
const { addUser } = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(cors());
const port = 3000;

// public folder to serve files
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.json());
app.use(express.static(publicDirectoryPath));
app.use(userRouter);

io.on('connection', (socket) => {
  console.log(`new connection - ${socket.id}`);

  socket.on('login', (options, callback) => {
    const user = addUser(options.name, options.gender, socket.id);
    callback(user);

    socket.broadcast.emit('userJoined');
  });

  socket.on('disconnect', () => {
    console.log(`disconnected - ${socket.id}`);
  });
});

server.listen(port, () => {
  console.log('Server is up on port ' + port);
});
