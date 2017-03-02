/*
(function() {
    'use strict';

    var homeAbout = {
            templateUrl: `app/home/about.component.html`,
            controller: function() {
                var ctrl = this;
            }
    };

    angular
        .module('home')
        .component('homeAbout', homeAbout)
        .config(function($stateProvider) {
            $stateProvider
                .state('home.about', {
                    url: '^/about',
                    views: {
                        'details@home': {
                            component: 'homeAbout'
                        }
                    }
                });
        });
})();
*/
