'use strict';

var grunt = require('grunt');
var notify = require('../tasks/lib/notify');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.notify = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },

  notify: function(test) {
    test.expect(1);

    notify({ title: 'title', message: 'message' }, function(err){
      test.equal(err, null, 'should not have any errors.');
      test.done();
    });

  },

  wierdChars: function(test) {
    test.expect(1);

    notify({ title: 'weird chars', message: 'bang! "quotes" [brackets] &and&' }, function(err){
      test.equal(err, null, 'should not have any errors.');
      test.done();
    });
  },

  noMessage: function(test) {
    test.expect(1);

    notify({ title: 'title' }, function(err){
      test.equal(err, 'Message is required', 'should error when no message.');
      test.done();
    });
  }
};
