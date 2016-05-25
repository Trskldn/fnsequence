var expect = require('chai').expect;
var fnsequence = require('./../index');
var Promise = require('promise');

describe('fnsequence', function() {
  it('should compose functions', function() {
    var result = [];

    var f1 = function() {
      result.push('f1');
    };

    var f2 = function() {
      return new Promise(function(resolve) {
        setTimeout(function() {
          result.push('f2');
          resolve();
        }, 100);
      });
    };

    var f3 = function() {
      return new Promise(function(resolve) {
        setTimeout(function() {
          result.push('f3');
          resolve();
        }, 10);
      })
    };

    var f4 = function() {
      result.push('f4');
    };

    var f = fnsequence(f1, f2, f3, f4);
    return f().then(function() {
      expect(result).to.be.deep.equal(['f1', 'f2', 'f3', 'f4']);
    });
  });

  it('should work with cntx', function() {
    var result = [];

    var f1 = function(cntx) {
      result.push('f1');
      cntx.data = 'hello';
    };
    var f2 = function() {
      result.push('f2');

    };
    var f3 = function() {
      result.push('f3');

    };
    var f4 = function(cntx) {
      result.push('f4');
      cntx.data = cntx.data + ' world';
    };

    var f = fnsequence(f1, f2, f3, f4);
    return f().then(function(cntx) {
      expect(cntx).to.have.property('data');
      expect(cntx.data).to.be.equal('hello world');
      expect(result).to.be.deep.equal(['f1', 'f2', 'f3', 'f4']);
    });
  });

  it('should throw error, when no parameters is passed', function() {
    expect(fnsequence).to.throw(TypeError);
  });

  it('should work, when type of arguments is not a function', function(done) {
    var f = fnsequence('test');
    f().then(function() {
      done();
    });
  });

});