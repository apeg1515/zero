(function() {
    'use strict';

    var homeRegister = {
            templateUrl: `app/home/register.component.html`,
            controller: 'RegisterController as ctrl'
    };

    angular
        .module('home')
        .component('homeRegister', homeRegister)
        .config(function($stateProvider) {
            $stateProvider
                .state('home.register', {
                    url: '^/register',
                    views: {
                        'details@home': {
                            component: 'homeRegister'
                        }
                    }
                });
        });
})();
