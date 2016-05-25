var expect = require('chai').expect;
var kombiner = require('./../kombiner');


describe('kombiner', function() {
  it('should compose functions', function(done) {
    var result = [];

    var f1 = function() {
      result.push('f1');
    };
    var f2 = function() {
      result.push('f2');

    };
    var f3 = function() {
      result.push('f3');

    };
    var f4 = function() {
      result.push('f4');

    };

    var f = kombiner(f1, f2, f3, f4);
    f().then(function() {
      expect(result).to.be.deep.equal(['f1', 'f2', 'f3', 'f4']);
      done();
    });
  });

  it('should accept parameters', function() {
    
  }); 

  it('should work, when no parameters passed', function(done) {
    var f = kombiner();
    f().then(function() {
      done();
    });
  });

  it('should work, when type of arguments is not a function', function(done) {
    var f = kombiner('test');
    f().then(function() {
      done();
    });
  });

});