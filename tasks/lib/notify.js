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
  require('./platforms/heysnarl') ||
  require('./platforms/notification-center') ||
  require('./platforms/notify-send') ||
  function(options, cb) {
    // no notification system
    if (cb) { cb(); }
  };

function removeColor(str) {
  if (typeof str === 'string') {
    return str.replace(/\x1B\[\d+m/g, '');
  }
  return str;
}

/**
 * Public function to notify
 * @param options - options.message is the only required value. title is recommended. subtitle is going overboard.
 * @param [cb] - optional callback. function(err, stdout, stderr)
 */
module.exports = function(options, cb) {

  options.title = removeColor(options.title);
  options.message = removeColor(options.message);

  if (!options.message) {
    return cb && cb(!options.message && 'Message is required');
  }

  return notify(options, cb);
};
