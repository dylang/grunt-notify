/*
 * grunt-notify
 * https://github.com/dylang/grunt-notify
 *
 * Copyright (c) 2012 Dylan Greene
 * Licensed under the MIT license.
 */

'use strict';

var ChildProcess = require('child_process');

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

// This only works on macs
var isMac = process.platform === 'darwin';

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
  if (!isMac || !options.message) {
    return cb && cb(!options.message && 'Message is required');
  }

  var title = escapeForCommandLine(options.title),
      message = escapeForCommandLine(options.message),
      subtitle = escapeForCommandLine(options.subtitle);

  var commandline = [TERMINAL_NOTIFIER_APP,
      (title ? '-title "' + title + '"' : ''),
      '-message "' + message + '"',
      (subtitle ? '-subtitle "' + subtitle + '"' : ''),
      '-group "' + process.cwd() + '"',
      (TERMINAL_PROGRAM ? ' -activate "' + TERMINAL_PROGRAM + '"' : '')].join(' ');

  // grunt.spawn isn't being used because I couldn't get the app to recognize the arguments
  return ChildProcess.exec(commandline, cb);
}


function gruntTask(grunt) {

  // All of these settings are customizable via notify_hooks
  var settings = {
    warnHookEnabled:        true,
    errorHookEnabled:       true,

    warnHookDefaultTitle:   'Grunt Warning',
    warnHookDefaultMessage: 'Warning!',

    errorHookDefaultTitle:   'Grunt Error',
    errorHookDefaultMessage: 'Error!'
  };

  // run on warning
  grunt.util.hooker.hook(grunt.fail, 'warn', function (error) {
    if (settings.warnHookEnabled) {
      notify({
        title:    settings.warnHookDefaultTitle,
        message:  error.message || error || settings.warnHookDefaultMessage
      });
    }
  });

  grunt.util.hooker.hook(grunt, 'warn', function (error) {
    if (settings.warnHookEnabled) {
      notify({
        title:    settings.warnHookDefaultTitle,
        message:  error.message || error || settings.warnHookDefaultMessage
      });
    }
  });
  //grunt.log.writeln().fail

  // run on error
  grunt.util.hooker.hook(grunt.fail, 'error', function (msg) {
    if (settings.errorHookEnabled) {
      notify({
        title:    settings.errorHookDefaultTitle,
        message:  msg || settings.errorHookDefaultMessage
      });
    }
  });

  // Use this to show an arbitrary notification.
  grunt.registerMultiTask('notify', 'Show an arbitrary notification whenever you need.', function() {
    var options = this.options({
      title:    'Grunt',
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
