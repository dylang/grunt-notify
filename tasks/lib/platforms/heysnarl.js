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
var spawn = require('../util/spawn');
var findApp = require('../util/findApp');

var cmd = 'heysnarl';
var IS_WINDOWS = os.type() === 'Windows_NT';
var DEFAULT_IMAGE = path.resolve(__dirname + '../../../../images/grunt-logo.png');
var DEFAULT_TIMEOUT = 2;
var DEFAULT_PRIORITY = 0;

function isSupported() {
  return IS_WINDOWS && findApp(cmd);
}

module.exports = isSupported() && function(options, cb) {

  var image = options.image || DEFAULT_IMAGE;
  var timeout = options.timeout || DEFAULT_TIMEOUT;
  var priority = options.priority || DEFAULT_PRIORITY;

  var param = 'notify?'
            + 'title=' + options.title
            + '&text=' + options.message
            + '&icon=' + image
            + '&timeout=' + timeout
            + '&priority=' + priority;

  spawn(cmd, [param], cb);
};
