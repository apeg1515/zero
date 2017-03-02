(function() {
    'use strict';
    var admin = {
        templateUrl: `app/profile/admin.component.html`
    };
    angular
        .module('profile')
        .component('admin', admin)
        .config(function($stateProvider) {
            $stateProvider
                .state('profile.admin', {
                    url: '/admin',
                    views: {
                        'details@profile': {
                            component: 'admin'
                        }
                    }
                });
        });
})();
