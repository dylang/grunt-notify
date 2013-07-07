var spawn = require('../util/spawn');

var cmd = 'heysnarl';

var args = JSON.parse(process.argv[2]);

spawn(cmd, [args.register], function () {
  spawn(cmd, [args.notification]);
});