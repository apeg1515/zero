(function() {
    'use strict';
    angular
        .module('home',[
            'ui.router',
            'ngMessages',
            'ngStorage'
        ]);
})();
(function() {
    'use strict';

    var home = {
        templateUrl: 'app/home/home.component.html',
        controller: function() {

        }
    };

    angular
        .module('home')
        .component('home', home)
        .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
            $stateProvider
                .state('home', {
                    url: '/',
                    views:{
                        'home': {
                                component: 'home'
                        },
                        'methods@home': {
                                component: 'homeMethods'
                        }
                    }
                });
            $urlRouterProvider.otherwise('/');
            $locationProvider.html5Mode(true);
        });
})();
