var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var DATA = {}
var user = {}

app.get('/', function(req, res){
  res.sendFile('index.html');
});

io.on('connection', function(socket){
  console.log('a user connected with socket id: ' + socket.id);
  var unique_room = socket.id
  socket.join(unique_room);
  // console.log(io.sockets.adapter.rooms); // ROOMS LOG
  io.to(unique_room).emit('bot message', 'hello ' + unique_room);
  
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.to(unique_room).emit('chat message', msg);
    setTimeout(function(){ io.to(unique_room).emit('bot message', "hello world!"); }, 1500);
  });

  socket.on('firstname', function(msg){
    console.log('message: ' + msg);
  });
  
  socket.on('disconnect', function(){
    console.log('a user disconnected with socket id: ' + socket.id);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
