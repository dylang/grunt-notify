/*
 * grunt-notify
 * https://github.com/dylang/grunt-notify
 *
 * Copyright (c) 2013 Dylan Greene
 * Licensed under the MIT license.
 */
'use strict';

var path = require('path');
var os = require('os');
var findApp = require('../util/findApp');
var spawn = require('../util/spawn');
var path = require('path');

var cmd = 'node';
var IS_WINDOWS = os.type() === 'Windows_NT';
var DEFAULT_IMAGE = path.resolve(__dirname + '../../../../images/grunt-logo.png');

function isSupported() {
  return  IS_WINDOWS && findApp(cmd) && findApp('heysnarl');
}

module.exports = isSupported() && function (options, cb) {
  var cmdPath = path.join(__dirname, "snarl_cmd.js");

  // stripping all special characters to have a valid app signiture
  var appSig = 'grunt-notify-' + options.title.replace(/[^a-zA-Z0-9]/g, "");
  
  var args = {
    register: 'register?app-sig=app/' + appSig +
              '&title=' + options.title + ' (grunt-notify)' +
              '&keep-alive=1',

    notification: 'notify?app-sig=app/' + appSig +
           '&title=' + options.title + ' (grunt-notify)' +
           '&text=' + options.message
  };

  // TODO: find a way to pass options, so that they can be used here
  if(!options.useSnarlIcon) {
    args.notification += '&icon=' + (options.image || DEFAULT_IMAGE);
  }

  if(options.sound) {
    args.notification += '&sound=' + options.sound;
  }

  if(options.timeout) {
    args.notification += '&timeout=' + options.timeout;
  }

  if(options.priority) {
    args.notification += '&priority=' + options.priority;
  }

  if(options.sensitivity) {
    args.notification += '&sensitivity=' + options.sensitivity;
  }

  // additional custom arguments
  if(options.customSnarlArgs) {
     args.notification += options.customSnarlArgs;
  }
  
  spawn(cmd, [cmdPath, JSON.stringify(args)], cb);
};

