(function() {
    'use strict';
    var billing = {
        templateUrl: `app/profile/billing.component.html`
    };
    angular
        .module('profile')
        .component('billing', billing)
        .config(function($stateProvider) {
            $stateProvider
                .state('profile.billing', {
                    url: '/billing',
                    views: {
                        'details@profile': {
                            component: 'billing'
                        }
                    }
                });
        });
})();
