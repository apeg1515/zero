(function() {
    'use strict';
    var security = {
        templateUrl: `app/profile/security.component.html`
    };
    angular
        .module('profile')
        .component('security', security)
        .config(function($stateProvider) {
            $stateProvider
                .state('profile.security', {
                    url: '/security',
                    views: {
                        'details@profile': {
                            component: 'security'
                        }
                    }
                });
        });
})();
