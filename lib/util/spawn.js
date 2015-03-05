'use strict';

var grunt = require('grunt');
var spawn = require('child_process').spawn;
var os = require('os');

module.exports = function(cmd, args, cb){
  var IS_WINDOWS = os.type() === 'Windows_NT';

  var options = {
    detached: true,
    stdio: [ 'ignore', 'ignore', 'ignore' ]
  };

  if (IS_WINDOWS) {
    options.windowsVerbatimArguments = true;
  }

  var child = spawn(cmd, args, options);

  child.on('exit', function (code) {
    if (typeof cb === 'function') {
      cb(code);
    }
  });
};