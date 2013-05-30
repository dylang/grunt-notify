'use strict';

var grunt = require('grunt');

module.exports = function(cmd, args, cb){

  var options = {
    detached: true
  };

  grunt.util.spawn({
    cmd: cmd,
    args: args,
    options: options
  }, function(err, result, code){
    if (cb) {
      cb(err);
    }
  });

};


