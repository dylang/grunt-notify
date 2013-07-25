/*
 * grunt-notify
 * https://github.com/dylang/grunt-notify
 *
 * Copyright (c) 2013 Dylan Greene
 * Licensed under the MIT license.
 */
'use strict';

var which = require('which').sync;
var path = require('path');
var fs = require('fs');

module.exports = function(filename) {

  if (filename.indexOf(path.sep)) {
    return fs.existsSync(filename);
  }

  // `which` throws errors in sync mode
  try {
    path = which(filename);
    if (!path.match(filename)){
      return false;
    }
  } catch (e) {
    path = false;
  }

  return path;
};