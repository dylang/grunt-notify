/*
 * grunt-notify
 * https://github.com/dylang/grunt-notify
 *
 * Copyright (c) 2013 Dylan Greene
 * Licensed under the MIT license.
 */

'use strict';

// try them all, one might work!
var notify = require('./platforms/growl-notify') ||
  require('./platforms/notification-center') ||
  require('./platforms/notify-send');

function removeColor(str) {
  return (str || '').replace(/\x1B\[\d+m/g, '');
}

/**
 * Public function to notify
 * @param options - options.message is the only required value. title is recommended. subtitle is going overboard.
 * @param [cb] - optional callback. function(err, stdout, stderr)
 */
module.exports = function(options, cb) {
  if (!notify) {
    return false;
  }

  if (!options.message) {
    return cb && cb(!options.message && 'Message is required');
  }

  options.title = removeColor(options.title);
  options.message = removeColor(options.message);

  return notify(options, cb);
};