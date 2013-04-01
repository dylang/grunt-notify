/*
 * grunt-notify
 * https://github.com/dylang/grunt-notify
 *
 * Copyright (c) 2013 Dylan Greene
 * Licensed under the MIT license.
 */
'use strict';

var which = require('which').sync;

module.exports = function(filename) {
  var path;

  // which throws errors in sync mode
  try {
    path = which(filename);
  } catch (e) {
    path = false;
  }

  return path;
};