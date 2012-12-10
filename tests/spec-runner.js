require.config({
    baseUrl: '../',
    paths: {
        'jquery': ['vendor/jquery-1.8.1.min'],
        'jasmine': ['tests/jasmine/jasmine'],
        'jasmine-html': ['tests/jasmine/jasmine-html'],
        'underscore': ['vendor/underscore'],
        'underscore-mixins': ['underscore-mixins'],
    },
    shim: {
        'underscore': {
            exports: '_'
        },
        'underscore-mixins': {
            deps: ['underscore']
        },
        'jasmine': {
            exports: 'jasmine'
        },
        'jasmine-html': {
            deps: ['jasmine']
        }
    }
});

require([
    'underscore',
    'jquery',
    'jasmine',
    'jasmine-html',
    'underscore-mixins'
],
function(_, $, jasmine) {
    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;
    var htmlReporter = new jasmine.HtmlReporter();
    jasmineEnv.addReporter(htmlReporter);
    jasmineEnv.specFilter = function(spec) {
        return htmlReporter.specFilter(spec);
    };

    var specs = [];
    specs.push('tests/specs');

    $(function() {
        require(specs, function() {
            jasmineEnv.execute();
        });
    });
});
