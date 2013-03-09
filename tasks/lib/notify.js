/*
 * grunt-notify
 * https://github.com/dylang/grunt-notify
 *
 * Copyright (c) 2013 Dylan Greene
 * Licensed under the MIT license.
 */

'use strict';
module.exports.init = function(grunt) {
  var ChildProcess = require('child_process');
  var StackParser = require('stack-parser');
  var Grunt = require('grunt');
  var Growl = require('growl');

  // OSX notification system doesn't have an API we can hit so we are using
  // Terminal Notifier created by Eloy Durán https://github.com/alloy/terminal-notifier
  var TERMINAL_NOTIFIER_APP = __dirname + '/../../lib/terminal-notifier/terminal-notifier.app/Contents/MacOS/terminal-notifier';

  // This only works on macs and linux
  var isMac = process.platform === 'darwin';
  var isLinux = process.platform === 'linux';

  function guessProjectName(){
    return process.cwd().split(require('path').sep).pop();
  }

  // Some characters are special in bash like $
  function escapeForCommandLine(str) {
    return str && typeof str === 'string' && str.replace(/([$"])/g, '\\$1');
  }

  /**
   * Public function to notify
   * @param options - options.message is the only required value. title is recommended. subtitle is going overboard.
   * @param [cb] - optional callback. function(err, stdout, stderr)
   */
  function trigger(options, cb) {
    var title = options.title,
      message = options.message,
      subtitle = options.subtitle,
      commandline;

    if (!options.message) {
      return cb && cb(!options.message && 'Message is required');
    }

    if (isMac) {

      title = escapeForCommandLine(title);
      message = escapeForCommandLine(message);
      subtitle = escapeForCommandLine(subtitle);

      commandline = [TERMINAL_NOTIFIER_APP,
        (title ? '-title "' + title + '"' : ''),
        '-message "' + message + '"',
        (subtitle ? '-subtitle "' + subtitle + '"' : ''),
        ].join(' ');

      // grunt.spawn isn't being used because I couldn't get the app to recognize the arguments
      return ChildProcess.exec(commandline, cb);
    }

    message = subtitle ? subtitle + ' ' + message : message;

    if (isLinux) {
      return Grunt.util.spawn({
        cmd: 'notify-send',
        args: [
          title,
          message
        ]
      }, cb);
    }

    return Growl(message, { title: title });
  }

  function exception(title, e) {
    var stackDump = StackParser.parse(e.stack);
    var stack = stackDump[0];
    var message, subtitle;

    // Find the first stack that isn't a node module or an internal Node function
    while (stack && (stack.file.match('/node_modules') || !stack.file.match('/'))) {
      stack = stackDump.shift();
    }

    if (stack) {
      subtitle = e.message;
      message = stack.file.replace(process.cwd(), '') + ' line ' + stack.line
    } else {
      message = e.message;
    }

    trigger({
      title:    title,
      subtitle: subtitle,
      message:  message
    });
  }

  return {
    guessProjectName: guessProjectName,
    exception: exception,
    trigger: trigger
  };
};
