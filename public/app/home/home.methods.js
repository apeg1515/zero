(function() {
    'use strict';
    var homeMethods = {
        template: `
        <div class="navbar-collapse collapse" id="navbar-main">
            <ul class="nav navbar-nav">
                <li><a ui-sref="home.about" ui-sref-active="active">about</a></li>
                <li class="dropdown">
                    <a  class="dropdown-toggle"
                        data-toggle="dropdown"
                        href="#"
                        id="home.services">services
                        <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="home.services">
                        <li><a href="#">customers</a></li>
                        <li class="divider"></li>
                        <li><a href="#">products</a></li>
                        <li><a href="#">cloud</a></li>
                    </ul>
                </li>
                <li><a ui-sref="home.contact" ui-sref-active="active">contact</a></li>
            </ul>

            <ul class="nav navbar-nav navbar-right">
                <li><a href="#" ng-click="$ctrl.checkloginStatus();"><i class="fa fa-home fa-lg" aria-hidden="true"></i></a></li>
                <li ui-sref-active="active"><a ui-sref="home.register">register</a></li>
                <li ui-sref-active="active"><a ui-sref="home.login">login</a></li>
            </ul>
        </div>`,
        controller : function($location, $localStorage) {
            var ctrl = this;

            ctrl.checkloginStatus = function() {
                var _auth = $localStorage.currentUser;

                if(!_auth) {
                    bootbox.alert({
                        title: 'Authorization',
                        message: 'Please make sure to login first <i class="fa fa-exclamation-circle" aria-hidden="true"></i>',
                        size: 'medium'
                    });
                }
                $location.path('/dashboard');
            };
        }
    };
    angular
        .module('home')
        .component('homeMethods', homeMethods);
})();
