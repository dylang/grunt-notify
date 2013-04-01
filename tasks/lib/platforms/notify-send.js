/*
 * grunt-notify
 * https://github.com/dylang/grunt-notify
 *
 * Copyright (c) 2013 Dylan Greene
 * Licensed under the MIT license.
 */
'use strict';

var ChildProcess = require('child_process');
var findApp = require('../util/findApp');
var escapeForCommandLine = require('../util/escapeForCommandLine');

var APP = 'notify-send';

function isSupported() {
  return findApp(APP);
}

module.exports = isSupported() && function(options, cb) {

  var cmd = [
    APP,
    escapeForCommandLine(options.title),
    escapeForCommandLine(options.message)
  ];

  return ChildProcess.exec(cmd, cb);
};