(function() {
    'use strict';

    function LoginController(homeService, $location) {
        var ctrl = this;

        ctrl.user = {
            email: '',
            password: ''
        };

        ctrl.onSubmit = function() {
            homeService.Login(ctrl.user)
                .then(function(res) {
                    if(res.success === true) {
                        $location.url('/dashboard');
                    }
                });
        };

        //ctrl.emailErrors = [];

        ctrl.passwordErrors = [
            {type: 'minlength', text: 'Must be at least 8 characters!!'},
            {type: 'maxlength',text: 'Must be 20 characters or less!!'},
            {type: 'pattern',text: 'Password should contain at least one digit, at least one lower case, at least one upper case, and a one special character!!'},
            {type: "required",text: "this field is required"}
        ];
    }

    angular
        .module('app')
        .controller('LoginController', LoginController);
})();
