/*
 * grunt-notify
 * https://github.com/dylang/grunt-notify
 *
 * Copyright (c) 2012 Dylan Greene
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/**/*.js',
        '<%= nodeunit.tests %>'
      ],
      fixtures: [
        'test/fixtures/*.js'
      ],
      options: {
        jshintrc: '.jshintrc',
        force: false
      }
    },

    watch: {
      test: {
          files: ['**/*.js'],
          tasks: ['nodeunit', 'notify'],
          options: {
            nospawn: true
          }
        }
    },

    // Configuration to be run (and then tested).
    notify: {
      custom_options: {
        options: {
          title: 'Notify Title',
          message: 'This is a "Notify Message" test!'
        }
      },
      just_message: {
        options: {
          message: 'Just Message'
        }
      },
      example: {
        options: {
          title: 'Doodle or Die',  // optional
          message: 'Deploy to production success!' //required
        }
      },
      directory: {
        options: {
          title: 'Directory',
          message: 'Look in c:\\temp\\new\\ or /var/tmp/new.'
        }
      },
      newlines: {
        options: {
          title: 'Directory',
          message: 'Line 1\nLine 2\nLine3\nLine 4\nLine 5.'
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['notify', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
