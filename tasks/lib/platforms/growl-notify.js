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
var findApp = require('../util/findApp');
var spawn = require('../util/spawn');

var cmd = 'growlnotify';
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
  return findApp(cmd);
}

function createImageArg(image) {

  var imageType = '';
  var extension;

  image = image || DEFAULT_IMAGE;

  if (IS_MAC) {
    extension = path.extname(image).substr(1);

    if (extension === 'icns') {
      imageType = 'iconpath';
    } else if (/^[A-Z]/.test(image)) {
      imageType = 'appIcon';
    } else if (/^png|gif|jpe?g$/.test(extension)) {
      imageType = 'image';
    } else if (extension) {
      imageType = 'icon';
      image = extension;
    } else {
      imageType = 'icon';
    }

    return [
      '--' + imageType,
      image
    ];
  }

  if (IS_WINDOWS) {
    return [
      '/i:' + image
    ];
  }

  return [];
}

function createTitleArg(title) {
  if (title) {
    return [
      windowsOnly('/t:') + title
    ];
  }
  return [];
}

function createMessageArg(message) {
  return [
    macOnly('-m'),
    message
  ];
}

module.exports = isSupported() && function (options, cb) {
  var args = []
      .concat(createImageArg(options.image))
      .concat(createMessageArg(options.message))
      .concat(createTitleArg(options.title));

  spawn(cmd, args, cb);
};

