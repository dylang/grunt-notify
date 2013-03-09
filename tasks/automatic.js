/*
 * grunt-notify
 * https://github.com/dylang/grunt-notify
 *
 * Copyright (c) 2013 Dylan Greene
 * Licensed under the MIT license.
 */

'use strict';


module.exports = function gruntTask(grunt) {

  var Notify = require('./lib/notify').init(grunt);

  // All of these settings are customizable via notify_hooks
  var settings = {
    enabled:        true,
    title:          Notify.guessProjectName()
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
        return Notify.exception(settings.title, e);
      }

      return Notify.trigger({
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

  grunt.registerTask('notify_hooks', 'Config the automatic notification hooks.', function(){
    settings = this.options(settings);
  });

};



