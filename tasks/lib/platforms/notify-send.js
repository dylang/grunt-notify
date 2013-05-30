/*
 * grunt-notify
 * https://github.com/dylang/grunt-notify
 *
 * Copyright (c) 2013 Dylan Greene
 * Licensed under the MIT license.
 */
'use strict';

var spawn = require('../util/spawn');
var findApp = require('../util/findApp');

var cmd = 'notify-send';

function isSupported() {
  return findApp(cmd);
}

module.exports = isSupported() && function(options, cb) {

  var args = [
    options.title,
    options.message
  ];

  spawn(cmd, args, cb);
};