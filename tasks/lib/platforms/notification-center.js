/*
 * grunt-notify
 * https://github.com/dylang/grunt-notify
 *
 * Copyright (c) 2013 Dylan Greene
 * Licensed under the MIT license.
 */
'use strict';

var types = require('../../notify_types');
var findApp = require('../util/findApp');
var spawn = require('../util/spawn');

var os = require('os');
var path = require('path');
var semver = require('semver');

// OSX notification system doesn't have an API Node can access so we are using
// Terminal Notifier created by Eloy Durán https://github.com/alloy/terminal-notifier
var cmd = findApp('terminal-notifier');

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

  switch (options.type) {
    case types.FAILURE: cmd += '-failed'; break;
    case types.SUCCESS: cmd += '-success'; break;
    default: cmd += '-notify'; break;
  };

  spawn(cmd, args, cb);
};