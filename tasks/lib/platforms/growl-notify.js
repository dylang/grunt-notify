/*
 * grunt-notify
 * https://github.com/dylang/grunt-notify
 *
 * Copyright (c) 2013 Dylan Greene
 * Licensed under the MIT license.
 */
'use strict';

var child_process = require('child_process');
var path = require('path');
var os = require('os');
var findApp = require('../util/findApp');
var escapeForCommandLine = require('../util/escapeForCommandLine');
var cmd;

var APP = 'growlnotify';
var IS_MAC = os.type() === 'Darwin';
var IS_WINDOWS = os.type() === 'Windows_NT';
var DEFAULT_IMAGE = path.resolve(__dirname + '../../../../images/grunt-logo.png');

function macOnly(string) {
  return IS_MAC ? string : '';
}

function windowsOnly(string) {
  return IS_WINDOWS ? string : '';
}

function isSupported() {
  return findApp(APP);
}

function createImageArg(image) {

  image = image || DEFAULT_IMAGE;

  if (IS_MAC) {
    var kind = '';
    var ext = path.extname(image).substr(1);

    if (ext === 'icns') {
      kind = 'iconpath';
    } else if (/^[A-Z]/.test(image)) {
      kind = 'appIcon';
    } else if (/^png|gif|jpe?g$/.test(ext)) {
      kind = 'image';
    } else if (ext) {
      kind = 'icon';
      image = ext;
    } else {
      kind = 'icon';
    }

    return '--' + kind + ' ' + image;
  }

  if (IS_WINDOWS) {
    return '/i:' + escapeForCommandLine(image);
  }

  return '';
}

function createTitleArg(title) {
  if (title) {
    return windowsOnly('/t:') + escapeForCommandLine(title);
  }
  return '';
}

function createMessageArg(message) {
  return macOnly('-m ') + escapeForCommandLine(message);
}

module.exports = isSupported() && function (options, cb) {

  var cmd = [
    APP,
    createImageArg(options.image),
    createMessageArg(options.message),
    createTitleArg(options.title)
  ].join(' ');

  console.log(cmd);

  // execute
  return child_process.exec(cmd, cb);
};

