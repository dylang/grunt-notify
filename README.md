# grunt-notify

> Automatic native notifications in OSX and Linux when tasks fail.


## Getting Started
This plugin requires Grunt `0.4`

It also requires `OS X 10.8.2` (Mountain Lion) or Linux using `notify-send` but it won't cause errors in older OS X versions or other platforms.

## Installing

```bash
npm install grunt-notify --save-dev
```

Once that's done, add this line to your project's `Gruntfile.js`:

```js
// Automatic notifications when tasks fail.
grunt.loadNpmTasks('grunt-notify');
```

**That's all you need for automatic notifications.**

[![Notify with Nodeunit](https://github.com/dylang/grunt-notify/raw/master/screenshots/nodeunit.png)](https://github.com/dylang/grunt-notify)

## Notify_Hooks Options

If you want change the automatic messaging configure a task called `notify_hooks`.

```js
grunt.initConfig({
  notify_hooks: {
    options: {
      //These are the defaults. Including them in this config is optional.
      enabled:        true,
      title:          process.cwd() // defaults to your project's directory name, you can change to the name of your project
    }
  }
});

// Load the task
grunt.loadNpmTasks('grunt-notify');

// This will load your configuration changes.
grunt.task.run('notify_hooks');
```

[![JSHint Example](https://github.com/dylang/grunt-notify/raw/master/screenshots/jshint.png)](https://github.com/dylang/grunt-notify)

## Showing Specfic Notifications

Sometimes you want to show messages like "Uglify complete" or "Project Deployed" - that's easy to do too.


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
      }
    },
    server: {
      options: {
        message: 'Server is ready!'
      }
    }
  }
});

grunt.loadNpmTasks('grunt-notify');

// simplified example
grunt.registerTask('server', ['uglify', 'sass', 'server', 'notify:server']);
```

[![Watch example](https://github.com/dylang/grunt-notify/raw/master/screenshots/watch.png)](https://github.com/dylang/grunt-notify)


### Options
* `title` (_optional_): Notification title
* `message` (_required_): Notification message
* `subtitle` (_optional_): Subtitle, I think it's a bit much.

## Tests
Run `grunt` to lint and run the tests.

## Terminal Notifier
To use the native notification system OSX requires packages to be signed and compiled using their platform and tools.
This is not very friendly for Node users so we are using the tiny signed native application
[Terminal Notifer](https://github.com/alloy/terminal-notifier) from [Eloy Durán](https://github.com/alloy).
We're stuck with the default icon for now, if anybody knows how it would be nice if we could use the Grunt logo or something custom instead.

## Growl, Windows, etc
Wish there was fallback support for Growl and other systems? Post a pull request with updated docs and tests and I'll be happy to update it.

## Doodle or Die
This project was created for and is used by the free game I co-created for Node Knockout called [Doodle or Die](http://doodleOrDie.com).

[![Doodle or Die example](https://github.com/dylang/grunt-notify/raw/master/screenshots/deploy.png)](http://doodleOrDie.com)

## Release History
Feb 19 - Added Linux support thanks to @johnmccalla, listen for fatal errors, simplified options.
Dec 28 - First version.

