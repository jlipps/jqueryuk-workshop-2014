/* global before:true, after:true, it:true, describe:true */
"use strict";
var wd = require('wd')
  , chai = require('chai')
  , chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
chai.should();

module.exports = function (caps) {
  describe('MovieSearch app (' + caps.platformName + ')', function () {
    var driver;
    var onSauce = process.env.SAUCE
      , username = process.env.SAUCE_USERNAME
      , key = process.env.SAUCE_ACCESS_KEY;

    before(function (done) {
      if (onSauce) {
        //driver = wd.promiseChainRemote(
      } else {
        driver = wd.promiseChainRemote('localhost', 4723);
      }
      driver.init(caps).nodeify(done);
    });

    after(function (done) {
      if (driver) {
        driver.quit().then(function () { driver = null; }).nodeify(done);
      } else {
        done();
      }
    });

    it('should open the app and get into webview mode', function (done) {
      driver
        .contexts()
        .then(function (ctxs) {
          ctxs.length.should.eql(2);
          return driver.context(ctxs[1]);
        })
        .nodeify(done);
    });

    it('should start out with no results', function (done) {
      driver
        .elementById('movie-list')
          .text()
            .should.eventually.contain('No results')
        .notify(done);
    });

    it('should not find any movies with just two chars', function (done) {
      driver
        .elementById('search')
        .sendKeys('ba')
        .elementById('movie-list')
          .text()
            .should.eventually.contain('No results')
        .notify(done);
    });

    it('should start finding movies with three chars', function (done) {
      driver
        .elementById('search')
        .sendKeys('t')
        .sleep(3000)
        .elementById('movie-list')
          .text()
            .should.eventually.contain('Bat')
        .notify(done);
    });

    it('should show a detail page', function (done) {
      driver
        .elementByXPath('//ul[@id="movie-list"]/li/a')
        .click()
        .sleep(2000)
        .elementById('movie-data')
          .text()
            .should.eventually.contain('Wyvern')
        .notify(done);
    });

    it('should go back', function (done) {
      driver
        .elementByLinkText('Back')
        .click()
        .sleep(2000)
        .elementById('movie-list')
          .text()
            .should.eventually.contain('Wyvern')
        .notify(done);
    });

    it('should clear results', function (done) {
      driver
        .elementByCss('a.ui-input-clear')
        .click()
        .sleep(2000)
        .elementById('movie-list')
          .text()
            .should.eventually.contain('No results')
        .notify(done);
    });

  });
};
