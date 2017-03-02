(function() {
    'use strict';

    function AuthorizationInterceptor($http, $localStorage, $state) {
        return {
            _currentUser: undefined,
            _currentToken: undefined,
            AuthorizationUser: function() {
                return $localStorage.currentUser = this._currentUser;
            },
            AuthorizationToken: function() {
                return $http.defaults.headers.common.Authrization = 'Bearer' + this._currentToken;
            },
            destroyAuthorization: function() {
                this._currentUser = undefined;
                this._currentToken = undefined;
                $state.go('home');
            }
        };
    }

    angular
        .module('app')
        .factory('AuthorizationInterceptor', AuthorizationInterceptor);
})();
