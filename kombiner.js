(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['promise'], factory);
  } else if (typeof exports === 'object') {
    var Promise = require('promise');
    module.exports = factory(Promise);
  } else {
    root.BackboneMultiExtend = factory(root.Promise);
  }
}(this, function(Promise) {
  return function( /*(fn|Array)*/ ) {
    var args = [].slice.call(arguments);
    var cntx = {};
    var dfr = $.Deferred();
    var fnmap;

    if (args.length == 1) {
      fnmap = Array.isArray(args[0]) ? args[0] : [args[0]];
    } else {
      fnmap = args;
    }

    function next(fnArr, args) {
      var fn = fnArr.shift();
      var dfrmap = (Array.isArray(fn) ? fn : [fn]).map(function(fn) {
        return fn.apply(fn, args);
      });

      $.when.apply($, dfrmap)
        .done(function(cntx) {
          if (fnArr.length > 0) {
            next(fnArr, args);
          } else {
            dfr.resolve(cntx);
          }
        })
        .fail(function(err) {
          dfr.reject(err);
        });
    }

    return function() {
      var args = [].slice.call(arguments).concat([cntx]);

      next(fnmap.slice(), args);
      return dfr.promise();
    };
  };
}));
