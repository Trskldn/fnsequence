var expect = require('chai').expect;
var sinon = require('sinon');
var kombiner = require('./../kombiner');


describe('kombiner', function() {
  it('should compose functions', function() {
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
    f();
    expect(result).to.be.deep.equal(['f1', 'f2', 'f3', 'f4']);  
  });
});