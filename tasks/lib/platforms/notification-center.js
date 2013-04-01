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
var semver = require('semver');
var escapeForCommandLine = require('../util/escapeForCommandLine');
var cmd;


// OSX notification system doesn't have an API Node can access so we are using
// Terminal Notifier created by Eloy Durán https://github.com/alloy/terminal-notifier
var APP = path.resolve(__dirname + '../../../../lib/terminal-notifier/terminal-notifier.app/Contents/MacOS/terminal-notifier');

function notificationCenterSupported() {
  return os.type() === 'Darwin' && semver.satisfies(os.release(), '>=12.0.0');
}

var ChildProcess = require('child_process');

module.exports = notificationCenterSupported() && function notify(options, cb) {

  if (!notificationCenterSupported()) {
    return cb('Notification center not supported');
  }

  var commandline = [
    APP,
    options.title ? '-title ' + escapeForCommandLine(options.title) + '' : '',
    '-message ' + escapeForCommandLine(options.message)
    ].join(' ');

  // grunt.spawn isn't being used because I couldn't get the app to recognize the arguments
  return ChildProcess.exec(commandline, cb);
};