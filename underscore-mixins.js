define(function(require) {
    var _ = require('underscore');

    // Underscore mixins, feel free to add any here.
    _.mixin({
        /**
         * Performs a shallow-diff comparison between two javascript
         * objects, and returns a hash of key-values of keys merged between
         * `obj1` and `obj2`, and `true` if there were changes, `false` if
         * not. Useful for determining attribute changes in Backbone models.
         *
         * It does not matter which order you pass the parameters, the
         * difference hash will remain the same.
         *
         * Example:
         *
         *     var newModelAttributes = {
         *         a: 1,
         *         b: {create: true, edit: false},
         *         c: 'test',
         *         d: {a: 'b', c: {d: true}}
         *     };
         *
         *     var oldModelAttributes = {
         *         a: 1,
         *         b: {create: true},
         *         c: undefined,
         *         e: [1, 2]
         *     };
         *
         *     _.changed(newModelAttributes, oldModelAttributes);
         *     >> {a: false, b: true, c: true, d: true, e: true}
         *
         * @param {Object} obj1 The first of two objects to diff between.
         * @param {Object} obj2 The second of two objects to diff between.
         * @return {Object|undefined} The hash of differences between `obj1`
         *   and `obj2`. Returns `undefined` if `obj1` and `obj2` are empty.
         */
        changed: function(obj1, obj2) {
            if (_.isEmpty(obj1) && _.isEmpty(obj2)) {
                return;
            }

            var result = {};
            var allKeys = _.keys(_.extend(result, obj2, obj1));

            _.each(allKeys, function(key) {
                var changed = false;
                if (!_.has(obj1, key) ||
                    !_.has(obj2, key) ||
                    !_.isEqual(obj1[key], obj2[key])
                ) {
                    changed = true;
                }
                result[key] = changed;
            });

            return result;
        }
    });
});
