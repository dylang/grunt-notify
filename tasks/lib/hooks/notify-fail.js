/*
 * grunt-notify
 * https://github.com/dylang/grunt-notify
 *
 * Copyright (c) 2013 Dylan Greene
 * Licensed under the MIT license.
 */
'use strict';

module.exports = function(grunt, options) {

  var StackParser = require('stack-parser');
  var notify = require('../notify');

  function exception(e) {
    var stackDump, stack, message;

    if (typeof e.stack !== 'string'){
      stackDump = StackParser.parse(e.stack);
      stack = stackDump[0];

      // Find the first stack that isn't a node module or an internal Node function
      while (stack && (stack.file.match('/node_modules') || !stack.file.match('/'))) {
        stack = stackDump.shift();
      }
    }

    if (stack && stack.file) {
      message = [
        stack.file.replace(process.cwd(), ''),
        'Line ' + stack.line,
        e.message
      ].join('\n');
    } else {
      message = e.message;
    }

    return message;
  }

  /**
   * Hook for showing the automatic message
   * @param e Exception or message
   * @returns {*}
   */
  function notifyHook(e) {

    var message;

    if (!options.enabled) {
      return;
    }

    if (!e) {
      return;
    }

    if (e && e.length === 1) {
      e = e[0];
    }

    if (/Task .* failed\./.test(e.message)) {
      message = e.message;
    } else if (e.message && e.stack) {
      message = exception(e);
    } else {
      message = e;
    }

    //grunt.log.ok('!!!!!!', message);

    return notify({
      title:    options.title + (grunt.task.current.nameArgs ? ' ' + grunt.task.current.nameArgs : ''),
      message:  message
    });
  }

  // run on warning
  grunt.util.hooker.hook(grunt, 'warn', notifyHook);
  grunt.util.hooker.hook(grunt.fail, 'warn', notifyHook);
  // run on error
  grunt.util.hooker.hook(grunt.fail, 'error', notifyHook);
  grunt.util.hooker.hook(grunt.log, 'fail', notifyHook);
  // run on fatal
  grunt.util.hooker.hook(grunt.fail, 'fatal', notifyHook);

  function setOptions(opts) {
    options = opts;
  }

  return {
    setOptions: setOptions
  };
};
