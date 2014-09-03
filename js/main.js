requirejs.config({
    baseUrl: "/js",
    paths: {
        "jquery": ["https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min", "lib/jquery-1.11.1.min"],
        "jqueryui": ["https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/jquery-ui.min"],
        "jquerymobile": ["https://ajax.googleapis.com/ajax/libs/jquerymobile/1.4.3/jquery.mobile.min"],
        "underscore": ["https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min", "lib/underscore-min"],
        "backbone": ["https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min", "lib/backbone-min"],
        "angular": ["https://ajax.googleapis.com/ajax/libs/angularjs/1.3.0-rc.0/angular.min", "lib/angular.min"]
    },
    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },
        'jqueryui': {
            deps: ['jquery']
        },
        'jquerymobile': {
            deps: ['jquery']
        }
    }
});

define(['jquery'], function($) {
  // DOM ready
  $(function($) {
    $('#wrapper').fadeIn(2000);
  });
});
