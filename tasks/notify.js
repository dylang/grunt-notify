/*
 * grunt-notify
 * https://github.com/dylang/grunt-notify
 *
 * Copyright (c) 2013 Dylan Greene
 * Licensed under the MIT license.
 */

'use strict';

var ChildProcess = require('child_process');
var grunt = require('grunt');
var StackParser = require('stack-parser');

// known terminal apps.
var TERMINAL_APPS = {
  'iTerm.app': 'com.googlecode.iterm2',
  Apple_Terminal: 'com.apple.Terminal'
};

// OSX notification system doesn't have an API we can hit so we are using
// Terminal Notifier created by Eloy Durán https://github.com/alloy/terminal-notifier
var TERMINAL_NOTIFIER_APP = __dirname + '/../lib/terminal-notifier/terminal-notifier.app/Contents/MacOS/terminal-notifier';

// program to bring into focus when the user clicks the notification
var TERMINAL_PROGRAM = TERMINAL_APPS[process.env.TERM_PROGRAM];

// This only works on macs and linux
var isMac = process.platform === 'darwin';
var isLinux = process.platform === 'linux';

var ProjectNameGuess = process.cwd().split(require('path').sep).pop();

// Some characters are special in bash like $
function escapeForCommandLine(str) {
  return str && typeof str === 'string' && str.replace(/([$"])/g, '\\$1');
}

/**
 * Public function to notify
 * @param options - options.message is the only required value. title is recommended. subtitle is going overboard.
 * @param [cb] - optional callback. function(err, stdout, stderr)
 */
function notify(options, cb) {
  var title = escapeForCommandLine(options.title),
    message = escapeForCommandLine(options.message),
    subtitle = escapeForCommandLine(options.subtitle),
    commandline;

  if (!options.message) {
    return cb && cb(!options.message && 'Message is required');
  }

  if (isMac) {
    commandline = [TERMINAL_NOTIFIER_APP,
      (title ? '-title "' + title + '"' : ''),
      '-message "' + message + '"',
      (subtitle ? '-subtitle "' + subtitle + '"' : ''),
      '-group "' + process.cwd() + '"',
      (TERMINAL_PROGRAM ? ' -activate "' + TERMINAL_PROGRAM + '"' : '')].join(' ');

    // grunt.spawn isn't being used because I couldn't get the app to recognize the arguments
    return ChildProcess.exec(commandline, cb);
  }

  if (isLinux) {
    return grunt.util.spawn({
      cmd: 'notify-send',
      args: [
        title,
        subtitle ? subtitle + ' ' + message : message
      ]
    }, cb);
  }

  // not able to run
  return false;
}

function notifyException(title, e) {
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

  notify({
    title:    title,
    subtitle: subtitle,
    message:  message
  });

}


function gruntTask(grunt) {

  // All of these settings are customizable via notify_hooks
  var settings = {
    enabled:        true,
    title:          ProjectNameGuess
  };

  /**
   * Hook for showing the automatic message
   * @param e Exception or message
   * @returns {*}
   */
  function notifyHook(e) {
      if (!settings.enabled) {
        return false;
      }

      if (e.message && e.stack) {
        return notifyException(settings.title, e);
      }

      return notify({
        title:    e && settings.title,  //only show title if there is an message
        message:  e || settings.title  // show message or title
      });
  }

  // run on warning
  grunt.util.hooker.hook(grunt.fail, 'warn', notifyHook);
  grunt.util.hooker.hook(grunt, 'warn', notifyHook);
  // run on error
  grunt.util.hooker.hook(grunt.fail, 'error', notifyHook);
 // run on fatal
  grunt.util.hooker.hook(grunt.fail, 'fatal', notifyHook);

  // Use this to show an arbitrary notification.
  grunt.registerMultiTask('notify', 'Show an arbitrary notification whenever you need.', function() {
    var options = this.options({
      title:    ProjectNameGuess,
      message:  '', //required
      subtitle: ''
    });

    if (options.message) {
      var done = this.async();
      notify(options, function(err, stdout, stderr) {
        grunt.log.debug('notify result:', {
          err:    err,
          stdout: stdout,
          stderr: stderr
        });
        done(err);
      });
    }

    grunt.log.debug('notify options:', options);
  });

  grunt.registerTask('notify_hooks', 'Config the automatic notification hooks.', function(){
    settings = this.options(settings);
  });
}

module.exports = gruntTask;
module.exports.notify = notify;
