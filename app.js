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

var led1 = new Pin(11),
  led2 = new Pin(13),
  led3 = new Pin(19),
  led4 = new Pin(21),
  led5 = new Pin(23);

Q.all([
  led1.setupOutput(),
  led2.setupOutput(),
  led3.setupOutput(),
  led4.setupOutput(),
  led5.setupOutput()
])
.then(function(){
  console.log("Leds initialized");
})
.catch(function(err){
  console.log(err);
});

io.on('connection', function(socket){
  console.log('Socket client connected');
  socket.on('setLedState', function (data) {
    console.log(data);
    if (data.led1 != null){
      led1.write(data.led1);
    }
    if (data.led2 != null){
      led2.write(data.led2);
    }
    if (data.led3 != null){
      led3.write(data.led3);
    }
    if (data.led4 != null){
      led4.write(data.led4);
    }
    if (data.led5 != null){
      led5.write(data.led5);
    }
  });
});

process.on('SIGINT', function () {
  gpio.destroy(function() {
    console.log('All pins unexported');
  });
  io.close();
});


