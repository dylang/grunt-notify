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
var url = require('url');
var spawn = require('../util/spawn');
var findApp = require('../util/findApp');

var cmd = 'heysnarl';
var INSTALL_DIR = path.join('full phat', 'Snarl', 'tools');
var FULL_PATH = path.join(process.env.ProgramFiles, INSTALL_DIR, cmd);
var FULL_PATH_x86 = path.join(process.env['ProgramFiles(x86)'], INSTALL_DIR, cmd);

var IS_WINDOWS = os.type() === 'Windows_NT';
var DEFAULT_IMAGE = path.resolve(__dirname + '../../../../images/grunt-logo.png');
var DEFAULT_TIMEOUT = 2;
var DEFAULT_PRIORITY = 0;

function findInstall() {
  return cmd = findApp(cmd)
      || findApp(FULL_PATH)
      || findApp(FULL_PATH_x86);
}

function isSupported() {
  return IS_WINDOWS && findInstall();
}

module.exports = isSupported() && function(options, cb) {

  var params = url.format({
    pathname: 'notify',
    query: {
      title: options.title,
      text: options.message,
      icon: options.image || DEFAULT_IMAGE,
      timeout: options.timeout || DEFAULT_TIMEOUT,
      priority: options.priority || DEFAULT_PRIORITY
    }
  });

  spawn(cmd, [params], cb);
};
