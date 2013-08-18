/*
 * grunt-notify
 * https://github.com/dylang/grunt-notify
 *
 * Copyright (c) 2013 Dylan Greene
 * Licensed under the MIT license.
 */
'use strict';

var NOTIFY_TYPE = 'no-notificaitons';

function supported() {
  return true;
}

function notify(options, cb) {
  options.debug({
    title: options.title,
    message: options.message
  });
  cb();
}


module.exports = {
  name: NOTIFY_TYPE,
  supported: supported,
  notify: notify
};