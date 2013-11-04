/*
 * grunt-notify
 * https://github.com/dylang/grunt-notify
 *
 * Copyright (c) 2013 Dylan Greene
 * Licensed under the MIT license.
 */
'use strict';

var NOTIFY_TYPE = 'notify-send';

var path = require('path');
var spawn = require('../util/spawn');
var findApp = require('../util/findApp');
var DEFAULT_IMAGE = path.resolve(__dirname + '../../../images/grunt-logo.png');

var CMD = 'notify-send';

function supported(options) {

  var app = findApp(CMD);

  options.debug({
    'notify-send': app || 'notify-send was not found in your path'
  });

  return !!findApp(CMD);
}

function notify(options, cb) {

  var args = [
    '--icon=' + DEFAULT_IMAGE,
    options.title,
    options.message
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