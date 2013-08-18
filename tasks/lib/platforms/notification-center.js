/*
 * grunt-notify
 * https://github.com/dylang/grunt-notify
 *
 * Copyright (c) 2013 Dylan Greene
 * Licensed under the MIT license.
 */
'use strict';

var NOTIFY_TYPE = 'notification-center';

var spawn = require('../util/spawn');
var path = require('path');
var os = require('os');
var semver = require('semver');


// OSX notification system doesn't have an API Node can access so we are using
// Terminal Notifier created by Eloy Durán https://github.com/alloy/terminal-notifier
var cmd = path.resolve(__dirname + '../../../../lib/terminal-notifier/terminal-notifier.app/Contents/MacOS/terminal-notifier');

function notificationCenterSupported(options) {
  var IS_MAC = os.type() === 'Darwin';
  var MOUNTAIN_LION = semver.satisfies(os.release(), '>=12.0.0');

  options.debug({
    os: os.type(),
    version: os.release(),
    IS_MAC: IS_MAC,
    MOUNTAIN_LION: MOUNTAIN_LION,
    semver: semver.satisfies(os.release(), '>=12.0.0'),
    notification_center: IS_MAC && MOUNTAIN_LION ? 'Will use Notification Center' : 'Not available for your OS.'
  });

  return IS_MAC && MOUNTAIN_LION;
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

function notify(options, cb) {

  var args = []
      .concat(pluckAsArg(options, 'title'))
      .concat(pluckAsArg(options, 'message'));

  options.debug({
    cmd: cmd,
    args: args.join(' ')
  });

  spawn(cmd, args, cb);
}


module.exports = {
  name: NOTIFY_TYPE,
  notify: notify,
  supported: notificationCenterSupported
};