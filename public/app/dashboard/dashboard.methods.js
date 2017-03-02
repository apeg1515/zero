(function() {
    'use strict';
    var dashboardMethods = {
        template: `
        <div class="navbar-collapse collapse" id="navbar-main">

            <ul class="nav navbar-nav navbar-right">

                 <li>
                    <a href="#" data-toggle="modal" data-target="#settingsModal"><i class="fa fa-search" aria-hidden="true"></i></a>
                </li>

                <li ui-sref-active="active">
                    <a ui-sref="profile"><i class="fa fa-cog" aria-hidden="true"></i></a>
                </li>
                <li>
                    <a ui-sref="dashboard"><i class="fa fa-home fa-lg" aria-hidden="true"></i></a>
                </li>
                <li ><a href="#" ng-click="$ctrl.Logout();">logout</a></li>
            </ul>
        </div>`,
        controller: function($http, $localStorage, $location, AuthorizationInterceptor) {
            var ctrl = this;

            ctrl.Logout = function() {
                var _auth = AuthorizationInterceptor;
               delete $localStorage.currentUser;
                $http.defaults.headers.common.Authorization = ' ';
                _auth.destroyAuthorization();
                $location.url('/');
            };
        }
    };
    angular
        .module('dashboard')
        .component('dashboardMethods', dashboardMethods);
})();
