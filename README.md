## Underscore.js Mixins

This repo contains a list of open-source mixins for [Underscore.js](http://underscorejs.org/). Feel free to use/fork/contribute!

### _.changed(obj1, obj2)

Performs a diff comparison between two javascript objects, and returns a hash of key-values of keys merged between `obj1` and `obj2`, and `true` if there were changes, `false` if not. Useful for determining attribute changes in Backbone models. Order of params does not matter.

**Example:**

```js
var newModelAttributes = {
    a: 1,
    b: {create: true, edit: false},
    c: 'test',
    d: {a: 'b', c: {d: true}}
};

var oldModelAttributes = {
    a: 1,
    b: {create: true},
    c: undefined,
    e: [1, 2]
};

_.changed(newModelAttributes, oldModelAttributes);
```

Output:
```
>> {a: false, b: true, c: true, d: true, e: true}
```
