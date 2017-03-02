(function() {
    'use strict';
    var notifications = {
        templateUrl: `app/profile/notifications.component.html`
    };
    angular
        .module('profile')
        .component('notifications', notifications)
        .config(function($stateProvider) {
            $stateProvider
                .state('profile.notifications', {
                    url: '/notifications',
                    views: {
                        'details@profile': {
                            component: 'notifications'
                        }
                    }
                });
        });
})();
