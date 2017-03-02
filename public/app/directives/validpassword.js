(function () {
    'use strict';

    function validPhone () {
        return {
            require: 'ngModel',
            scope: {
                otherModelValue: '=validPhone'
            },
            link: function (scope, elment, attrs, ngModel) {
                ngModel.$validators.validPhone = function(modelValue) {
                    return modelValue === scope.otherModelValue;
                };

                scope.$watch('otherModelValue', function() {
                    ngModel.$validate();
                });
            }
        };
    }

    angular
        .module('app')
        .directive('validPhone', validPhone);
})();
