function using(name, values, func) {
  for (var i = 0, count = values.length; i < count; i++) {
    if (Object.prototype.toString.call(values[i]) !== '[object Array]') {
      values[i] = [values[i]];
    }
    func.apply(this, values[i]);
    jasmine.currentEnv_.currentSpec.description += ' (with "' + name + '" using ' + values[i].join(', ') + ')';
  }
};

define(['underscore'], function(_) {
    describe('diff', function() {
        using('different objects', [
            {
                // empty case
                newObject: {},
                oldObject: {},
                expected: undefined
            },
            {
                // mix of new keys, nested objects, different values
                newObject: {
                    a: 1,
                    b: {create: true, edit: false},
                    c: 'test',
                    d: {a: 'b', c: {d: true}}
                },
                oldObject: {
                    a: 1,
                    b: {create: true},
                    c: undefined,
                    e: [1, 2]
                },
                expected: {
                    a: false,
                    b: true,
                    c: true,
                    d: true,
                    e: true
                }
            },
            {
                // should return the same object even if the params are flipped
                oldObject: {
                    a: 1,
                    b: {create: true, edit: false},
                    c: 'test',
                    d: {a: 'b', c: {d: true}}
                },
                newObject: {
                    a: 1,
                    b: {create: true},
                    c: undefined,
                    e: [1, 2]
                },
                expected: {
                    a: false,
                    b: true,
                    c: true,
                    d: true,
                    e: true
                }
            },
            {
                // same objects
                newObject: {priority: {create:'no', edit: 'no'}},
                oldObject: {priority: {create:'no', edit: 'no'}},
                expected: {priority: false}
            },
            {
                // new object contains nothing
                newObject: {},
                oldObject: {priority: {create:'no', edit: 'no'}},
                expected: {priority: true}
            }
        ], function(value) {
            it('should return the differences between the objects', function() {
                expect(_.changed(value.newObject, value.oldObject)).toEqual(value.expected);
            });
        });
    });
});
