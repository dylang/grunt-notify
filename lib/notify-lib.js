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

var platformsPaths = {
  'growl-notify'        : './platforms/growl-notify',
  'hey-snarl'           : './platforms/hey-snarl',
  'notification-center' : './platforms/notification-center',
  'notify-send'         : './platforms/notify-send',
  'toaster'             : './platforms/toaster',
  'chrome'              : './platforms/chrome-notifications',
  'no-notifications'    : './platforms/no-notifications'
};

// Don't show the same message twice in a row
var previousMessage;
var previousMessageTimeoutMS = 1000;
var previousMessageTimer;

var notifyPlatform;

function choosePlatform(cb) {

  var options = { debug: debug('grunt-notify')};

  for(var platformName in platformsPaths) {
    // Skip Chrome as it is the only platform with asynchronous 'supported' method
    // so check it last
    if (platformName === 'chrome') { continue; }

    var platform = require(platformsPaths[platformName]);

    if (platform.supported(options)) {
      return cb(platform);
    }
  }

  var chrome = require(platformsPaths['chrome']);

  chrome.supported(options, function(isSupported) {
    if (isSupported) {
      cb(chrome);
    }
    else {
      cb(require(platformsPaths['no-notifications']));
    }
  });
    
}

function postNotificationViaPlatform(options, notifyPlatform, cb) {
  options.title = removeColor(options.title);
  options.message = removeColor(options.message);

  if (!options.message) {
    return cb && cb(!options.message && 'Message is required');
  }
  
  function resetPreviousTimer(newMessage) {
    previousMessage = newMessage;
    clearTimeout(previousMessageTimer);
    previousMessageTimer = setTimeout(function(){previousMessage = false;}, previousMessageTimeoutMS);
  }

  if (options.message === previousMessage) {
    resetPreviousTimer(options.message);
    if (typeof cb === 'function') {
      cb();
    }
    return;
  }

  resetPreviousTimer(options.message);

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

/**
 * Public function to notify
 * @param options - options.message is the only required value. title is recommended. subtitle is going overboard.
 * @param [cb] - optional callback. function(err, stdout, stderr)
 */
function postNotification(options, cb) {  
  if (options.platform && options.platform.name in platformsPaths) {
    var platform = require(platformsPaths[options.platform.name]);
    postNotificationViaPlatform(options, platform, cb);
  }
  else {
    choosePlatform(function(notifyPlatform) {
      postNotificationViaPlatform(options, notifyPlatform, cb);
    });    
  }
}

module.exports = postNotification;
