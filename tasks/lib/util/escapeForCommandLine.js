/*
 * grunt-notify
 * https://github.com/dylang/grunt-notify
 *
 * Copyright (c) 2013 Dylan Greene
 * Licensed under the MIT license.
 */
'use strict';

module.exports = function escapeForCommandLine(string) {
  return JSON
    .stringify(string)
    .replace(/\\n/g, '\n'); // put new lines back in
};