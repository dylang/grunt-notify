'use strict';

var grunt = require('grunt');
var escapeForCommandLine = require('../tasks/lib/util/escapeForCommandLine');

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

  escapeDirStartingWithN: function(test) {
    test.expect(1);

    test.equal(escapeForCommandLine('\\dir1\\ndir\\dir2'), '"\\\\dir1\\\\ndir\\\\dir2"', 'should be the same');
    test.done();
  },

  escapeTextWithLinebreaks: function(test) {
    test.expect(1);

    test.equal(escapeForCommandLine('here is\na text\n'), '"here is\\na text\\n"', 'should be the same');
    test.done();
  }

};
