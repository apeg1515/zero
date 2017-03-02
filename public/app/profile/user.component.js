(function() {
    'use strict';
    var user = {
        templateUrl: `app/profile/user.component.html`
    };
    angular
        .module('profile')
        .component('user', user)
        .config(function($stateProvider) {
            $stateProvider
                .state('profile.user', {
                    url: '/user',
                    views: {
                        'details@profile': {
                            component: 'user'
                        }
                    }
                });
        });
})();
