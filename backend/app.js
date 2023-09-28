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

app.get('/', (req, res) => {
  console.log("jenkinstest-9")
  res.send('Hello, this is a GET request response!');
});

const users = {};

io.on('connection', (socket) => {
  socket.on('new-user-joined', (name) => {
    users[socket.id] = name;
    socket.broadcast.emit('user-joined', name);
  });

  socket.on('send', (message) => {
    socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
  });

  socket.on('disconnect', message =>{
    socket.broadcast.emit('left', users[socket.id]);
    delete users[socket.id];
  })
});

const port = process.env.PORT || 8001;
http.listen(port, () => {
    console.log('server running at http://3.109.143.138:8001');
  });

