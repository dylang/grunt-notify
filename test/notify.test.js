'use strict';
var expect = require('chai').expect;

var grunt = require('grunt');
var notify = require('../tasks/lib/notify-lib');
var proxyquire = require('proxyquire');


describe('grunt-notify', function () {

  describe('sanity checks', function () {
    it('notify', function (done) {
      notify({ title: 'title', message: 'message' }, function(err){
        if (err) throw err;
        //expect(err).to.be.empty;
        done();
      });
    });

    it('weird chars', function (done) {
      notify({ title: 'weird chars', message: 'bang! "quotes" [brackets] &and&' }, function(err){
        if (err) throw err;
        //expect(err).to.be.;
        done();
      });
    });

    it('notify', function (done) {
      notify({ title: 'title' }, function(err){
        expect(err).to.equal('Message is required');
        done();
      });
    });

  });

  describe('try all the platforms', function () {

    var debug = function(msg){
      //console.log(msg);
      expect(msg).to.be.an.object;
    };

    function fakeSpawn(cmd, args, cb){
      expect(cmd).to.not.be.empty;
      expect(args).to.be.an.array;
      console.log(cmd, args.join(' '));
      cb();
    }

    var options = {
      debug: debug
    };

    it('growl', function (done) {
      var growl = proxyquire('../tasks/lib/platforms/growl-notify', {'../util/spawn': fakeSpawn });
      expect(growl.name).to.equal('growl');
      expect(growl.supported(options)).to.be.a.boolean;
      expect(growl.notify).to.be.a.function;
      growl.notify({ title: 'title', message: 'message', debug: debug }, done);
    });

    it('notification center', function (done) {
      var noteCenter = proxyquire('../tasks/lib/platforms/notification-center', {'../util/spawn': fakeSpawn });
      expect(noteCenter.name).to.equal('notification-center');
      expect(noteCenter.supported(options)).to.be.a.boolean;
      expect(noteCenter.notify).to.be.a.function;
      noteCenter.notify({ title: 'title', message: 'message', debug: debug }, done);
    });

    it('snarl', function (done) {
      var snarl = proxyquire('../tasks/lib/platforms/hey-snarl', {'../util/spawn': fakeSpawn });
      expect(snarl.name).to.equal('snarl');
      expect(snarl.supported(options)).to.be.a.boolean;
      expect(snarl.notify).to.be.a.function;
      snarl.notify({ title: 'title', message: 'message', debug: debug }, done);
    });

    it('notify send', function (done) {
      var notifySend = proxyquire('../tasks/lib/platforms/notify-send', {'../util/spawn': fakeSpawn });
      expect(notifySend.name).to.equal('notify-send');
      expect(notifySend.supported(options)).to.be.a.boolean;
      expect(notifySend.notify).to.be.a.function;
      notifySend.notify({ title: 'title', message: 'message', debug: debug }, done);
    });


  });

});
