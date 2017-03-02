(function() {
    'use strict';

    function homeService($http,$localStorage) {
        var ctrl = this;

        ctrl.Login = function(params) {
            return $http
                .post('/authenticate-login', params).then(function(response) {
                    console.log(response.data.success);
                    if(response.data.success === false) {
                        bootbox.alert({
                            message: `${response.data.message}`,
                        });
                    }
                    $localStorage.currentUser ={email: response.data.email,token: response.data.token};
                     $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;
                    return response.data;

                });
        };

        ctrl.Register = function(params) {
            return $http
                .post('/authenticate-register', params).then(function(response) {
                    return response.data;
                });
        };

        ctrl.Token = function(param) {
            //alert($localStorage.currentUser.token);
            return $http
                .get(`/dashboard-jwt?q=${param}`,
                    {headers: {'Authorization': $localStorage.currentUser.token }})
                .then(function(response) {
                    return response.data;
                });

        };


    }
    angular
        .module('home')
        .service('homeService', homeService);
})();
