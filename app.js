var gpio = require('rpi-gpio');
var path = require('path');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var Q = require('q');
var Pin = require('./pin.js');

app.use(express.static(path.join(__dirname, 'public')));

server.listen(3000, function () {
  console.log('Server listening at port 3000');
});

var button1 = new Pin(11),
  button2 = new Pin(13),
  button3 = new Pin(19),
  button4 = new Pin(21),
  button5 = new Pin(23);

Q.all([
  button1.setupOutput(),
  button2.setupOutput(),
  button3.setupOutput(),
  button4.setupOutput(),
  button5.setupOutput()
])
.then(function(){
  console.log("Buttons initialized");
})
.catch(function(err){
  console.log(err);
});

io.on('connection', function(socket){
  console.log('Socket client connected');
  socket.on('setButtonState', function (data) {
    console.log(data);
    button1.write(data.button1);
    button2.write(data.button2);
    button3.write(data.button3);
    button4.write(data.button4);
    button5.write(data.button5);
  });
});

process.on('SIGINT', function () {
  gpio.destroy(function() {
    console.log('All pins unexported');
  });
  io.close();
});


