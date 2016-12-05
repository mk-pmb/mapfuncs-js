
<!--#echo json="package.json" key="name" underline="=" -->
mapfuncs
========
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Collect result of each function for given arguments and context.
<!--/#echo -->


Usage
-----

see [test.js](test.js) for examples.

<!--!#include file="test.js" start="  //#u" stop="  //#r"
  outdent="  " code="javascript" -->
<!--/include-->



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






<!--#toc stop="scan" -->


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
