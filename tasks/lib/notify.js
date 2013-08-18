/*
 * grunt-notify
 * https://github.com/dylang/grunt-notify
 *
 * Copyright (c) 2013 Dylan Greene
 * Licensed under the MIT license.
 */

'use strict';
var removeColor = require('./util/removeColor');
var debug = require('./util/debug');

var notifyPlatform;

function choosePlatform() {

  var options = { debug: debug('grunt-notify')};
  // This needs to be cleaned up to make it easier to add new platforms

  var grow_notify = require('./platforms/growl-notify');

  if (grow_notify.supported(options)) {
    return grow_notify;
  }

  var hey_snarl = require('./platforms/hey-snarl');

  if (hey_snarl.supported(options)) {
    return hey_snarl;
  }

  var notification_center = require('./platforms/notification-center');

  if (notification_center.supported(options)) {
    return notification_center;
  }

  var notify_send = require('./platforms/notify-send');

  if (notify_send.supported(options)) {
    return notify_send;
  }

  return require('./platforms/no-notifications');
}


/**
 * Public function to notify
 * @param options - options.message is the only required value. title is recommended. subtitle is going overboard.
 * @param [cb] - optional callback. function(err, stdout, stderr)
 */
function postNotification(options, cb) {

  options.title = removeColor(options.title);
  options.message = removeColor(options.message);


  if (!options.message) {
    return cb && cb(!options.message && 'Message is required');
  }

  if (!notifyPlatform) {
    notifyPlatform = choosePlatform();
  }

  options.debug = debug(notifyPlatform.name); //for debug logging

  return notifyPlatform.notify(options, function(err){
      if (err) {
        options.debug({
          return_code: err
        });
      }
      if (typeof cb === 'function') {
        cb(err);
      }
    });
}

module.exports = postNotification;