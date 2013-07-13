/*
 * grunt-notify
 * https://github.com/dylang/grunt-notify
 *
 * Copyright (c) 2013 Dylan Greene
 * Licensed under the MIT license.
 */
'use strict';

var path = require('path');
var qs = require('querystring');
var spawn = require('../util/spawn');
var findApp = require('../util/findApp');

var cmd = 'heysnarl';
var DEFAULT_IMAGE = path.resolve(__dirname + '../../../../images/grunt-logo.png');

function isSupported() {
  return findApp(cmd);
}

module.exports = isSupported() && function(options, cb) {

  var args = {
    title: options.title,
    text: options.message,
    icon: DEFAULT_IMAGE
  };

  var param = 'notify?' + qs.stringify(args);

  spawn(cmd, [param], cb);
};
