require('dotenv').config()
const app = require('express')();
const cors = require('cors'); // Import the cors package
const http = require('http').Server(app);

// Your Socket.IO configuration
const io = require('socket.io')(http,{
    cors : {
        origin : "*"
    } 
});

// Define your Socket.IO code here

const users = {};

io.on('connection', (socket) => {
  socket.on('new-user-joined', (name) => {
    // console.log(name);
    users[socket.id] = name;
    socket.broadcast.emit('user-joined', name);
  });

  socket.on('send', (message) => {
    socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
  });
});

const port = process.env.PORT || 8000;
http.listen(port, () => {
    console.log('server running at http://52.66.243.220:8000');
  });
