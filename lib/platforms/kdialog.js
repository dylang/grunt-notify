/*
 * grunt-notify
 * https://github.com/dylang/grunt-notify
 *
 * Copyright (c) 2013 Dylan Greene
 * Licensed under the MIT license.
 */
'use strict';

var NOTIFY_TYPE = 'kdialog';

var path = require('path');
var spawn = require('../util/spawn');
var findApp = require('../util/findApp');
var DEFAULT_DURATION = 1;
var CMD = 'kdialog';

function supported(options) {

  var app = findApp(CMD);

  options.debug({
    'kdialog': app || 'kdialog was not found in your path'
  });

  return !!findApp(CMD);
}

function notify(options, cb) {

  var args = [
    '--passivepopup',
    options.message,
    '--title=' + options.title,
    DEFAULT_DURATION
  ];

  options.debug({
    cmd: CMD,
    args: args.join(' ')
  });

  spawn(CMD, args, function(code) {
    if (code !== 0) {
      cb(code);
    } else {
      cb();
    }
  });
}

module.exports = {
  name: NOTIFY_TYPE,
  notify: notify,
  supported: supported
};
