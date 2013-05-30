/*
 * grunt-notify
 * https://github.com/dylang/grunt-notify
 *
 * Copyright (c) 2013 Dylan Greene
 * Licensed under the MIT license.
 */
'use strict';

var spawn = require('../util/spawn');
var path = require('path');
var os = require('os');
var semver = require('semver');


// OSX notification system doesn't have an API Node can access so we are using
// Terminal Notifier created by Eloy Durán https://github.com/alloy/terminal-notifier
var cmd = path.resolve(__dirname + '../../../../lib/terminal-notifier/terminal-notifier.app/Contents/MacOS/terminal-notifier');

function notificationCenterSupported() {
  return os.type() === 'Darwin' && semver.satisfies(os.release(), '>=12.0.0');
}

function pluckAsArg(options, prop) {
  if (options[prop]) {
    return [
      '-' + prop,
      options[prop]
    ];
  }
  return [];
}

module.exports = notificationCenterSupported() && function notify(options, cb) {

  var args = []
      .concat(pluckAsArg(options, 'title'))
      .concat(pluckAsArg(options, 'message'));

  spawn(cmd, args, cb);
};