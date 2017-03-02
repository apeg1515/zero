(function() {
    'use strict';

    var homeLogin = {
        templateUrl: `app/home/login.component.html`,
        controller: 'LoginController as ctrl'
    };

    angular
        .module('home')
        .component('homeLogin', homeLogin)
        .config(function($stateProvider) {
            $stateProvider
                .state('home.login', {
                    url: '^/login',
                    views: {
                        'details@home': {component: 'homeLogin'}
                    }
                });
        });
})();
