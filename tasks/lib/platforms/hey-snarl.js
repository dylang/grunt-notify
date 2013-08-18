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

function findInstall() {

  var INSTALL_DIR = path.join('full phat', 'Snarl', 'tools');
  var PROGRAM_FILES = process.env.ProgramFiles || '';
  var PROGRAM_FILES_X86 = process.env['ProgramFiles(x86)'] || '';
  var full_path = path.join(PROGRAM_FILES, INSTALL_DIR, cmd);
  var full_path_x86 = path.join(PROGRAM_FILES_X86, INSTALL_DIR, cmd);

  return cmd = findApp(cmd) ||
    findApp(full_path) ||
    findApp(full_path_x86);
}

function isSupported() {
  return IS_WINDOWS && findInstall();
}

function escape(str) {
  return str.replace(/&/g, '&&').substr(0, 60);
}

function notify(options, cb) {
  var params =
    'notify?' +
    'title=' + escape(options.title) + '&' +
    'text=' + escape(options.message) + '&' +
    'icon=' + (options.image || DEFAULT_IMAGE);

  spawn(cmd, [params], function(err, result, code){
    if (typeof cb === 'function') {
      cb();
    }
  });
}

module.exports = isSupported() && function(options, cb) {
  notify(options, cb); //, function(){
};
