const express = require('express');
const path = require('path');
const logger = require('morgan');
const {Server} = require('socket.io');

require('dotenv').config();

// Global variables
const PORT = process.env.PORT || 5000;
let usernames = [];

const app = express();
const httpServer = require('http').createServer(app);

const io = new Server(httpServer);

//json parsing
app.use(express.json());
//form-data parsing
app.use(express.urlencoded({extended: false}))

//morgan logger
app.use(logger('dev'));

// Routes
app.get('/', (req, res)=>{
  res.sendFile(__dirname + '/index.html');
})

// Socket connection
io.on('connection', (socket)=>{
  console.log('Socket connected >>> ', socket.id);

  socket.on('new user', (data, cb)=>{
    if(usernames.indexOf(data) !== -1){
      cb(false);
    }else{
      cb(true)
      socket.username = data;
      usernames.push(socket.username);
      updateUsername();
    }
  })

  // Update usernames
  const updateUsername = function(){
    io.emit('usernames', usernames);
  }

  // Send Message
  socket.on('send message', (data)=>{
    io.emit('new message', {message: data, user: socket.username});
  })

  // Disconnect
  socket.on('disconnect', (data)=>{
    if(!socket.username){
      return;
    }
    usernames.splice(usernames.indexOf(socket.username), 1);
    updateUsername();
  })
})

httpServer.listen(PORT, ()=>console.log(`<<< Server is ONN at PORT-${PORT} >>>`))
