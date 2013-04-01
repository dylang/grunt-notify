/*
 * grunt-notify
 * https://github.com/dylang/grunt-notify
 *
 * Copyright (c) 2013 Dylan Greene
 * Licensed under the MIT license.
 */
'use strict';

module.exports = function(grunt, options) {

  var notify = require('../notify');

  var filename;
  var reason;
  var lineNumber;

  function grabFilename(message) {
    var parseMessage = grunt.log.uncolor(message).match(/^Linting\s(.*)\.\.\.$/);
    if (parseMessage && parseMessage.length === 2) {
      filename = parseMessage[1];
    }
  }

  function grabErrors(message) {
    if (!options.enabled) {
      return;
    }

    if (!message) {
      return;
    }

    var parseMessage = grunt.log.uncolor(message).match(/^\[L([0-9]*).*:\s(.*)$/);

    if (parseMessage && parseMessage.length === 3) {
      lineNumber = parseMessage[1];
      reason = parseMessage[2];
      return;
    }

    if (lineNumber && reason) {
      notify({
          title: options.title + (grunt.task.current.nameArgs ? ' ' + grunt.task.current.nameArgs : ''),
          message: [
            filename,
            'Line ' + lineNumber + ': ' + reason,
            message.trim()
          ].join('\n')
        });
      lineNumber = false;
      reason = false;
    }
  }

  // try to catch jshint errors
  grunt.util.hooker.hook(grunt.log, 'writeln', grabErrors);
  grunt.util.hooker.hook(grunt.verbose, 'write', grabFilename);

  function setOptions(opts) {
    options = opts;
  }

  return {
    setOptions: setOptions
  };

};