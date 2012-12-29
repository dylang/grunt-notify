# grunt-notify

> Automatic OSX Native Notifications when Grunt tasks fail.

This requires `Grunt 0.4`. It also requires `OSX 10.8.2` (Mountain Lion) but it won't cause errors in older OSX versions or other platforms. 

## Getting Started

```bash
npm install grunt-notify --save-dev
```

Once that's done, add this line to your project's Gruntfile:

```js
grunt.loadNpmTasks('grunt-notify');
```

## Automatic behavior
By including `grunt.loadNpmTasks('grunt-notify');` in your `Gruntfile.js` you will automatically get notifications when Grunt has warnings or errors!

[![Notify with Nodeunit](https://github.com/dylang/grunt-notify/raw/master/screenshots/nodeunit.png)]

## Configuring the automatic behavior
These are the defaults. Any can be changed.

```js
grunt.initConfig({
  notify_hooks: {
    options: {
        warnHookEnabled:        true,
        errorHookEnabled:       true,

        warnHookDefaultTitle:   'Grunt Warning',
        warnHookDefaultMessage: 'Warning!', // used if the warning from Grunt is not available

        errorHookDefaultTitle:   'Grunt Error',
        errorHookDefaultMessage: 'Error!' // used if the error from Grunt is not available
    }
  }
});

// Load the task
grunt.loadNpmTasks('grunt-notify');

// Always run it anytime you use `grunt` it uses your `notify_hooks` options.
grunt.task.run('notify_hooks');
```

[![JSHint Example](https://github.com/dylang/grunt-notify/raw/master/screenshots/jshint.png)]

## Arbitrary figuring Notification Messages

### notify Muti-task
Lets say you want a notification `watch` detects a change or when uploading to `s3` is complete. That's very easy to do:

```js
grunt.initConfig({
  notify: {
    task_name: {
      options: {
        // Task-specific options go here.
      }
    },
    watch: {
      options: {
        title: 'Task Complete',  // optional
        message: 'SASS and Uglify finished running', //required
        subtitle: '' // optional, kinda a lot for a message
      }
    },
    helloWorld: {
      options: {
        message: 'Hello world!'
      }
    }
  },
});

grunt.loadNpmTasks('grunt-notify');
grunt.registerTask('default', 'notify:helloWorld');
```
[![Watch example](https://github.com/dylang/grunt-notify/raw/master/screenshots/watch.png)]

### Options
* `title` (_optional_): Notification title
* `message` (_required_): Notification message
* `subtitle` (_optional_): Subtitle, I think it's a bit much.

## Tests
Run `grunt` to lint and run the tests.

## Terminal Notifier
To use the native notification system OSX requires packages to be signed and compiled using their platform and tools. This is not very friendly for Node users so we are using the tiny signed native application [Terminal Notifer](https://github.com/alloy/terminal-notifier) from [Eloy Durán](https://github.com/alloy). We're stuck with the default icon for now, if anybody knows how it would be nice if we could use the Grunt logo or something custom instead.

## Growl, Windows, etc
Wish there was fallback support for Growl and other systems? Post a pull request with updated docs and tests and I'll be happy to update it.

## Doodle or Die
This project was created for and is used by [Doodle or Die](http://doodleOrDie.com). 

[![Doodle or Die example](https://github.com/dylang/grunt-notify/raw/master/screenshots/deploy.png)](http://doodleOrDie.com)

## Release History
Dec 28 - First version
