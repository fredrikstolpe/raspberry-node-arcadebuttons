var gpio = require('rpi-gpio');
var Q = require('q');

module.exports = Pin;

function Pin(pin){
  this.pin = pin;
};

Pin.prototype.setupOutput = function(){
  var self = this;
  var deferred = Q.defer();
  gpio.setup(this.pin, gpio.DIR_OUT, function(err){
    if (err){
        deferred.reject(err);
      }
      else{
        //console.log('Pin ' + self.pin + ' opened');
        deferred.resolve('Pin setup');
      }
  });
  return deferred.promise;
};

Pin.prototype.write = function(value){
  var self = this;
  var deferred = Q.defer();
  gpio.write(this.pin, value, function(err) {
    if (err){
      deferred.reject(err);
    }
    else{
      //console.log('Pin ' + self.pin + ' value ' + value);
      deferred.resolve('Written to pin');
    }
  });
  return deferred.promise;
};