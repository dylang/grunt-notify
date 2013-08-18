var grunt = require('grunt');

function debug(name, obj) {
  Object.keys(obj).forEach(function(key){
    grunt.log.debug('[' + name + '] ' + key + ': ' + obj[key]);
  });
}

module.exports = function(name) {
  return function(obj) {
    debug(name, obj);
  }
};
