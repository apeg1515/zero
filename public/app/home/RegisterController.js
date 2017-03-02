(function() {
    'use strict';

    function RegisterController(homeService, $state) {
        var ctrl = this;

        ctrl.register = {
            fname: '',
            lname:'',
            email: '',
            phone: '',
            street: '',
            city: '',
            state: ctrl.state,
            zip: '',
            password: ''
        };
        ctrl.onRegister = function() {
           // console.log(ctrl.register);

            homeService.Register(ctrl.register)
                .then(function(res) {
                    console.log(res);
                    bootbox.alert({
                      size: "medium",
                        title: "Your Title",
                          message:`${res.message}`,
                            callback: function($stateProvider){ $state.go('home.login'); }
                     });
            });

        };
    }

    angular
        .module('app')
        .controller('RegisterController', RegisterController);
})();
