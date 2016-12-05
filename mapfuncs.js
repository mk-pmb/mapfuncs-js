/*jslint indent: 2, maxlen: 80 */
/* -*- tab-width: 2 -*- */

function mapFuncs(funcs, args, ctx) {
  'use strict';
  if (arguments.length === 1) {
    return function () { return mapFuncs(funcs, arguments, this); };
  }
  if (!funcs) { return []; }
  if (typeof funcs === 'function') { return funcs.apply(ctx, args); }
  return Array.prototype.map.call(funcs, mapFuncs.applyTo(args, ctx));
}

mapFuncs.applyTo = function (args, ctx) {
  'use strict';
  return function (fn) { return fn.apply(ctx, args || []); };
};



(function unifiedExport() {
  'use strict';
  /*globals define: true, module: true */
  if (('function' === typeof define) && define.amd) {
    define(function () { return mapFuncs; });
  }
  if (('object' === typeof module) && module && module.exports) {
    module.exports = mapFuncs;
  }
}());
