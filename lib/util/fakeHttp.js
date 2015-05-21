'use strict';

function Resposne() {
  var self = this;
  this._callbacks = [];

  this.fakeRequest = function() {
    setTimeout(function() {
      for(var i in self._callbacks) {
        self._callbacks[i]( "TEST" );        
      }
    }, 500);
  };

  this.setEncoding = function() {

  };

  this.on = function(event, cb) {
    this._callbacks.push(cb);
  };
}

module.exports = {
  request : function(options, cb) {
    var res = new Resposne();
    res.fakeRequest();
    cb(res);

    return {
      on : function() {},
      write : function() {},
      end : function() {}
    };
  }
};