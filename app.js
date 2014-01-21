var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , redis = require('redis').createClient(); 

server.listen(8081); 

redis.subscribe('rt-change');

io.sockets.on('connection', function(socket){
  console.log('IO ON !');
  redis.on('message', function(channel, message){
  	console.log('REDIS ON !');
    socket.emit('rt-change', JSON.parse(message));
  });
});
