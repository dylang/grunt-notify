/*
 * grunt-notify
 * https://github.com/dylang/grunt-notify
 *
 * Copyright (c) 2012 Dylan Greene
 * Licensed under the MIT license.
 */

'use strict';

var growl = require('growl');

/**
 * Public function to notify
 * @param options - options.message is the only required value. title is recommended. subtitle is going overboard.
 * @param [cb] - optional callback. function(err, stdout, stderr)
 */
function notify(options, cb) {
  if (!options.message) {
    return cb && cb(!options.message && 'Message is required');
  }

  growl(options.message || '', {
    title: options.title || '',
    image: (options.status ? (__dirname + '/../img/' + status + '.png') : '')
  });
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
