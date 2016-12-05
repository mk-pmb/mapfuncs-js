/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var expect = require('assert').deepStrictEqual;

function readmeDemo(typeOf) {
  var mapFuncs = require('mapfuncs'), funcs = [
    function upper(s) { return String(s).toUpperCase(); },
    function meta(s) { return typeOf(s) + ':' + (s || '').length; },
    function firstItem(x) { return (x || false)[0]; },
    function context() { return typeOf(this); },
  ], result, proxy, smiley = ':-)';

  result = mapFuncs(funcs, [ 'Hello', 'World!' ]);
  expect(result, [ 'HELLO', 'str:5', 'H', 'undef' ]);

  result = mapFuncs(funcs, [ 'Hello', 'World!' ], /rgx/);
  expect(result, [ 'HELLO', 'str:5', 'H', 'RegExp' ]);

  // False-y functions list defaults to empty list:
  [null, undefined, false, 0].forEach(function (nope) {
    result = mapFuncs(nope, ['Hello', 'World!'], /rgx/);
    expect(result, []);
  });

  // False-y arguments list defaults to empty list:
  [null, undefined, false, 0].forEach(function (nope) {
    result = mapFuncs(funcs, nope, /rgx/);
    expect(result, [ 'UNDEFINED', 'undef:0', undefined, 'RegExp' ]);
  });

  // Prepare a proxy function for your list:
  proxy = mapFuncs(funcs);
  result = proxy(['Hello', 'World!']);
  expect(result, [ 'HELLO,WORLD!', 'Array:2', 'Hello', 'undef' ]);

  result = proxy('Hello', 'World!');
  expect(result, [ 'HELLO', 'str:5', 'H', 'undef' ]);

  result = proxy.call(/rgx/, 'Hello', 'World!');
  expect(result, [ 'HELLO', 'str:5', 'H', 'RegExp' ]);

  result = ['Hello', 'World!'].map(proxy);
  expect(result, [
    [ 'HELLO',  'str:5', 'H', 'undef' ],
    [ 'WORLD!', 'str:6', 'W', 'undef' ],
  ]);

  // You can modify the list of functions later:
  expect(proxy(smiley), [ ':-)', 'str:3', ':', 'undef' ]);
  funcs.splice(2);
  funcs[1] = encodeURIComponent;
  expect(proxy(smiley), [ ':-)', '%3A-)' ]);
}


readmeDemo(function typeOf(x) {
  if (x === undefined) { return 'undef'; }
  if (x === null) { return 'null'; }
  var t = typeof x;
  t = (t === 'object' ? Object.prototype.toString.call(x).slice(8, -1)
    : t.slice(0, 3));
  return t;
});






console.log("+OK tests passed.");   //= "+OK tests passed."
