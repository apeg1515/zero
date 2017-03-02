(function() {
    'use strict';
    var saved = {
        templateUrl: `app/profile/saved.component.html`
    };
    angular
        .module('profile')
        .component('saved', saved)
        .config(function($stateProvider) {
            $stateProvider
                .state('profile.saved', {
                    url: '/saved',
                    views: {
                        'details@profile': {
                            component: 'saved'
                        }
                    }
                });
        });
})();
