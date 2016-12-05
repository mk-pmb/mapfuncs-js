
<!--#echo json="package.json" key="name" underline="=" -->
mapfuncs
========
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Collect result of each function for given arguments and context.
<!--/#echo -->


API
---

Lists should be Array-like objects, or should be false-y, in which
case they default to an empty list.


### mapFuncs(funcs, args[, ctx])

Invoke each function in list `funcs` with arguments list `args` and
context `ctx`, collect and return the results.

In case of just one function, you can pass it directly as `funcs`,
no need to wrap it in a one-item list.

Together with the false-y default, this allows to use `mapFuncs` for
a simple event subscriber model:

```javascript
Blog.prototype.publish = function (post) {
  post.url = this.save(post);
  this.posts.push(post);
  mapFuncs(this.onpublish, [post, this]);
};
```


### mapFuncs(funcs)

Return a proxy function that will pass its arguments and context to each
function in list `funcs` and returns the collected results.

The proxy function will use the original list of functions (not a copy),
so changes to that list will apply to the proxy immediately.




Usage
-----

<!--#include file="test.js" start="  //#u" stop="  //#r"
  outdent="  " code="javascript" -->
<!--#verbatim lncnt="50" -->
```javascript
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

```
<!--/include-->



<!--#toc stop="scan" -->


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
