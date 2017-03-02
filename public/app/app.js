(function() {
    'use strict';

       angular
        .module('app',[
            'home',
            'dashboard',
            'profile',
            'angular-loading-bar',
            'ngAnimate'
        ])
        .run(function ($transitions, cfpLoadingBar) {
            $transitions.onStart({}, cfpLoadingBar.start);
            $transitions.onSuccess({}, cfpLoadingBar.complete);
        });
})();
