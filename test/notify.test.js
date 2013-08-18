'use strict';
var expect = require('chai').expect;

var grunt = require('grunt');
var notify = require('../tasks/lib/notify');


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
});
