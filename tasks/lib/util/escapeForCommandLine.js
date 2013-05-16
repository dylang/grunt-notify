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
    .replace(/[^\\][\\][n]/g, function(match) {
        return match.substring(0,1) + match.substring(1,3);
    }); // put new lines back in
};