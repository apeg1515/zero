(function() {
    'use strict';
    angular
        .module('dashboard', [
            'ui.router'
        ]);
})();

(function() {
    'use strict';

    var dashboard = {
        template: `
            <dashboard-navbar></dashboard-navbar>
        `,
        controller: function($localStorage, $state) {
            var ctrl = this;

            ctrl.searchObject = {
                engine: '',
                ecode: '',
                defectcode: '',
                defectlabel: '',
                ewrcode: '',
                ewrlabel: '',
                agcode: '',
                vfccode: '',
                verbatim: ''
            };

            ctrl.onSearch = function() {
                $localStorage._search = ctrl.searchObject;
                $state.go('search');
            };
        }
    };

    angular
        .module('dashboard')
        .component('dashboard', dashboard)
        .config(function($stateProvider) {
            $stateProvider
                .state('dashboard', {
                    url:'/dashboard',
                     resolve: {
                        auth: function($location, $localStorage, AuthorizationInterceptor) {
                            var _auth = AuthorizationInterceptor;
                            if(!$localStorage.currentUser) {
                                return $location.url('/login');
                            }
                            _auth._currentUser = $localStorage.currentUser.email;
                            _auth._currentToken = $localStorage.currentUser.token;
                        }
                    },
                    views: {
                        'dashboard' : {
                            component:'dashboard'
                        },
                        'methods@dashboard': {
                            component: 'dashboardMethods'
                        }
                    }
                });

        });
})();
