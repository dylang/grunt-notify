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

var cmd = 'heysnarl.exe';

var IS_WINDOWS = os.type() === 'Windows_NT';
var DEFAULT_IMAGE = path.resolve(__dirname + '../../../../images/grunt-logo.png');
var DEFAULT_TIMEOUT = 2;
var DEFAULT_PRIORITY = 0;

function findInstall() {

  var INSTALL_DIR = path.join('full phat', 'Snarl', 'tools');
  var full_path = path.join(process.env.ProgramFiles, INSTALL_DIR, cmd);
  var full_path_x86 = path.join(process.env['ProgramFiles(x86)'], INSTALL_DIR, cmd);

  return cmd = findApp(cmd) ||
    findApp(full_path) ||
    findApp(full_path_x86);
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

  // don't want the windows version of newline
  params = params.replace(/\%0A/g, '\n');

  spawn(cmd, [params], function(err){
    // heysnarl seems to sends err even when it doesn't need to
    cb();
  });
};
