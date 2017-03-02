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
        .run(["$transitions", "cfpLoadingBar", function ($transitions, cfpLoadingBar) {
            $transitions.onStart({}, cfpLoadingBar.start);
            $transitions.onSuccess({}, cfpLoadingBar.complete);
        }]);
})();

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
        .config(["$stateProvider", function($stateProvider) {
            $stateProvider
                .state('dashboard', {
                    url:'/dashboard',
                     resolve: {
                        auth: ["$location", "$localStorage", "AuthorizationInterceptor", function($location, $localStorage, AuthorizationInterceptor) {
                            var _auth = AuthorizationInterceptor;
                            if(!$localStorage.currentUser) {
                                return $location.url('/login');
                            }
                            _auth._currentUser = $localStorage.currentUser.email;
                            _auth._currentToken = $localStorage.currentUser.token;
                        }]
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

        }]);
})();

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

(function() {
    'use strict';

    function dashboardNavbar() {
        return {
            restrict: 'E',
            scope: {},
            template: `<div class="navbar navbar-default navbar-fixed-top" id="dashboard-navbar">
    <div class="container">
        <div class="navbar-header">
            <a ui-sref="home" class="navbar-brand">Brand</a>
            <button class="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
        </div>
        <div ui-view="methods"></div>
    </div>
</div>
<div class="container">
    <div class="home-details" ui-view="details"></div>

    <div class="modal left fade" id="settingsModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">

                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" id="search-form-horizontal" ng-submit="$ctrl.onSearch();">
                        <fieldset>
                            <legend></legend>
                            <div class="form-group">
                                <label for="engine" class="col-sm-2 control-label">engine:</label>
                                <div class="col-sm-9">
                                    <input type="text" ng-model="$ctrl.searchObject.engine" class="form-control" id="engine" placeholder="enter the engine type">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="engine" class="col-sm-2 control-label">ecode:</label>
                                <div class="col-sm-9 ">
                                    <input type="text" ng-model="$ctrl.searchObject.ecode" class="form-control" id="inputPassword" placeholder="enter the ecode">
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="defectcode" class="col-sm-2 control-label">defect code:</label>
                                <div class="col-sm-9">
                                    <input type="text"ng-model="$ctrl.searchObject.defectcode"class="form-control" id="defectcode" placeholder="enter the defect code">
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="col-sm-10 col-sm-offset-1">
                                    <input type="text"ng-model="$ctrl.searchObject.defectlabel"class="form-control" id="defectlabel" placeholder="enter the defect label">
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="col-sm-10 col-sm-offset-1">
                                    <input type="text" class="form-control" id="inputPassword" placeholder="enter the ewr code">
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="col-sm-10 col-sm-offset-1">
                                    <input type="text" class="form-control" id="inputPassword" placeholder="enter the ag code">
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="col-sm-10 col-sm-offset-1">
                                    <input type="text" class="form-control" id="inputPassword" placeholder="enter the vfc code">
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="col-sm-10 col-sm-offset-1">
                                    <input type="text" class="form-control" id="inputPassword" placeholder="enter the verbatim">
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="col-sm-10 col-sm-offset-2">
                                    <button type="submit" id="search-menu-btn" class="btn btn-danger">search</button>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>

            </div><!-- modal-content -->
        </div><!-- modal-dialog -->
    </div><!-- end of modal left fade -->

<h1> hello Alex </h1>
</div>`
        };
    }

    angular
        .module('app')
        .directive('dashboardNavbar', dashboardNavbar);
})();

(function() {
    'use strict';

    angular
        .module('app')

        .directive('modal', modal)
        .directive('modalHeader', modalHeader)
        .directive('modalBody', modalBody)
        .directive('modalFooter', modalFooter)

        function modal() {
            return {
                restrict: 'E',
                template: `
                    <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-md">
                            <div class="modal-content" ng-transclude>
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">
                                            &times;
                                        </span>
                                    </button>
                                    <h4 class="modal-title" id="myModalLabel">Modal title</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                `,
                transclude: true,
                replace: true,
                scope: {visible: '=', onSown: '&', onHide: '&'},
                link: function postLink(scope, element, attrs) {

                    $(element).modal({show: false, keyboard: attrs.keyboard, backdrop: attrs.backdrop});

                    scope.$watch(function() {
                        return scope.visible;
                    }, function(value) {
                        (value === true)?   $(element).modal('show') : $(element).modal('hide'); //if true show else hide
                    });

                    $(element).on('shown.bs.modal', function() {
                        scope.$apply(function() {
                        scope.$parent[attrs.visible] = true;
                        });
                    });


                    $(element).on('hidden.bs.modal', function() {
                        scope.$apply(function() {
                        scope.$parent[attrs.visible] = false;
                        });
                    });

                    $(element).on('shown.bs.modal', function() {
                        scope.$apply(function() {
                            scope.onSown({});
                        });
                    });

                    $(element).on('hidden.bs.modal', function() {
                        scope.$apply(function() {
                            scope.onHide({});
                        });
                    });
                }//end of link

            };
        }//end modal()

        function modalHeader() {
            return {
                restrict: 'E',
                replace: true,
                scope: {title: '@'},
                template: '<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title">{{title}}</h4></div>'
            };
        }//end of modalHeader()

        function modalBody() {
            return {
                restrict: 'E',
                replace: true,
                transclude: true,
                template: '<div class="modal-body" ng-transclude></div>'
            };
        } //end of modalBody()

        function modalFooter() {
            return {
                restrict: 'E',
                replace: true,
                transclude: true,
                template: '<div class="modal-footer" ng-transclude></div>',
            };
        }//end of modalFooter()


})();

(function() {
    'use strict';

    function selState() {
        return {
            restrict: 'E',
            scope: {
                selectedState: '='
            },
            template: `
                <div class="col-lg-10">
                    <select
                        class="form-control"
                        id="state"
                        ng-model="selectedState"
                        ng-required="required"
                        ng-options="s.name for s in states">
                    </select>
                </div>
            `,
            link: function(scope, element, attrs) {
                scope.states = [
                    {name: 'select your state', abr:NaN},
                    {abr:'AL', name: 'Alabama'},
                    {abr:'AK', name: 'Alaska'},
                    {abr: 'AS', name: 'American Samoa'},
                    {abr:'AZ', name: 'Arizona'},
                    {abr:'AR', name:'Arkansas'},
                    {abr:'CA', name:'California'},
                    {abr:'CO', name:'Colorado'},
                    {abr:'CT', name:'Connecticut'},
                    {abr:'DE', name:'Delaware'},
                    {abr:'DC', name:'District Of Columbia'},
                    {abr:'FM', name:'Federated States Of Micronesia'},
                    {abr:'FL', name:'Florida'},
                    {abr:'GA', name:'Georgia'},
                    {abr:'GU', name:'Guam'},
                    {abr:'HI', name:'Hawaii'},
                    {abr:'ID', name:'Idaho'},
                    {abr:'IL', name:'Illinois'},
                    {abr:'IN', name:'Indiana'},
                    {abr:'IA', name:'Iowa'},
                    {abr:'KS', name:'Kansas'},
                    {abr:'KY', name:'Kentucky'},
                    {abr:'LA', name:'Louisiana'},
                    {abr:'ME', name:'Maine'},
                    {abr:'MH', name:'Marshall Islands'},
                    {abr:'MD', name:'Maryland'},
                    {abr:'MA', name:'Massachusetts'},
                    {abr:'MI', name:'Michigan'},
                    {abr:'MN', name:'Minnesota'},
                    {abr:'MS', name:'Mississippi'},
                    {abr:'MO', name:'Missouri'},
                    {abr:'MT', name:'Montana'},
                    {abr:'NE', name:'Nebraska'},
                    {abr:'NV', name:'Nevada'},
                    {abr:'NH', name:'New Hampshire'},
                    {abr:'NJ', name:'New Jersey'},
                    {abr:'NM', name:'New Mexico'},
                    {abr:'NY', name:'New York'},
                    {abr:'NC', name: 'North Carolina'},
                    {abr:'ND', name:'North Dakota'},
                    {abr:'MP', name:'Northern Mariana Islands'},
                    {abr:'OH', name:'Ohio'},
                    {abr:'OK', name:'Oklahoma'},
                    {abr:'OR', name: 'Oregon'},
                    {abr:'PW', name: 'Palau'},
                    {abr:'PA', name: 'Pennsylvania'},
                    {abr:'PR', name: 'Puerto Rico'},
                    {abr:'RI', name: 'Rhode Island'},
                    {abr:'SC', name: 'South Carolina'},
                    {abr:'SD', name: 'South Dakota'},
                    {abr:'TN', name: 'Tennessee'},
                    {abr:'TX', name: 'Texas'},
                    {abr:'UT', name:'Utah'},
                    {abr:'VT', name: 'Vermont'},
                    {abr:'VI', name: 'Virgin Islands'},
                    {abr:'VA', name: 'Virginia'},
                    {abr:'WA', name:'Washington'},
                    {abr:'WV', name:'West Virginia'},
                    {abr:'WI', name:'Wisconsin'},
                    {abr:'WY', name: 'Wyoming'}
                ];
                scope.selectedState = scope.states[0];
            }
        };
    }

    angular
        .module('app')
        .directive('selState', selState);
})();

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

(function() {
    'use strict';

    LoginController.$inject = ["homeService", "$location"];
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

(function() {
    'use strict';

    RegisterController.$inject = ["homeService", "$state"];
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

/*
(function() {
    'use strict';

    var homeAbout = {
            templateUrl: `app/home/about.component.html`,
            controller: function() {
                var ctrl = this;
            }
    };

    angular
        .module('home')
        .component('homeAbout', homeAbout)
        .config(function($stateProvider) {
            $stateProvider
                .state('home.about', {
                    url: '^/about',
                    views: {
                        'details@home': {
                            component: 'homeAbout'
                        }
                    }
                });
        });
})();
*/

(function() {
    'use strict';
    angular
        .module('home',[
            'ui.router',
            'ngMessages',
            'ngStorage'
        ]);
})();
(function() {
    'use strict';

    var home = {
        templateUrl: 'app/home/home.component.html',
        controller: function() {

        }
    };

    angular
        .module('home')
        .component('home', home)
        .config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function($stateProvider, $urlRouterProvider, $locationProvider) {
            $stateProvider
                .state('home', {
                    url: '/',
                    views:{
                        'home': {
                                component: 'home'
                        },
                        'methods@home': {
                                component: 'homeMethods'
                        }
                    }
                });
            $urlRouterProvider.otherwise('/');
            $locationProvider.html5Mode(true);
        }]);
})();

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

(function() {
    'use strict';

    var homeLogin = {
        templateUrl: `app/home/login.component.html`,
        controller: 'LoginController as ctrl'
    };

    angular
        .module('home')
        .component('homeLogin', homeLogin)
        .config(["$stateProvider", function($stateProvider) {
            $stateProvider
                .state('home.login', {
                    url: '^/login',
                    views: {
                        'details@home': {component: 'homeLogin'}
                    }
                });
        }]);
})();

(function() {
    'use strict';

    var homeRegister = {
            templateUrl: `app/home/register.component.html`,
            controller: 'RegisterController as ctrl'
    };

    angular
        .module('home')
        .component('homeRegister', homeRegister)
        .config(["$stateProvider", function($stateProvider) {
            $stateProvider
                .state('home.register', {
                    url: '^/register',
                    views: {
                        'details@home': {
                            component: 'homeRegister'
                        }
                    }
                });
        }]);
})();

(function() {
    'use strict';
    var admin = {
        templateUrl: `app/profile/admin.component.html`
    };
    angular
        .module('profile')
        .component('admin', admin)
        .config(["$stateProvider", function($stateProvider) {
            $stateProvider
                .state('profile.admin', {
                    url: '/admin',
                    views: {
                        'details@profile': {
                            component: 'admin'
                        }
                    }
                });
        }]);
})();

(function() {
    'use strict';
    var billing = {
        templateUrl: `app/profile/billing.component.html`
    };
    angular
        .module('profile')
        .component('billing', billing)
        .config(["$stateProvider", function($stateProvider) {
            $stateProvider
                .state('profile.billing', {
                    url: '/billing',
                    views: {
                        'details@profile': {
                            component: 'billing'
                        }
                    }
                });
        }]);
})();

(function() {
    'use strict';
    var notifications = {
        templateUrl: `app/profile/notifications.component.html`
    };
    angular
        .module('profile')
        .component('notifications', notifications)
        .config(["$stateProvider", function($stateProvider) {
            $stateProvider
                .state('profile.notifications', {
                    url: '/notifications',
                    views: {
                        'details@profile': {
                            component: 'notifications'
                        }
                    }
                });
        }]);
})();

(function() {
    'use strict';
    angular
        .module('profile',[
            'ui.router'
        ]);
})();
(function() {
    'use strict';
    var profile ={
        template: `
            <div class="navbar navbar-default navbar-fixed-top" id="dashboard-navbar">
                <div class="container">
                    <div class="navbar-header">
                        <a ui-sref="home" class="navbar-brand">Brand</a>
                        <button class="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main">
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                    </div>
                    <!-- <div ui-view="methods"></div> -->

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
                            <li><a ui-sref="home.contact" ui-sref-active="active">contacts</a></li>
                        </ul>

                        <ul class="nav navbar-nav navbar-right">
                            <li ui-sref-active="active">
                                <a ui-sref="settings"><i class="fa fa-cog" aria-hidden="true"></i></a>
                            </li>
                            <li>
                                <a ui-sref="dashboard"><i class="fa fa-home fa-lg" aria-hidden="true"></i></a>
                            </li>
                            <li ><a href="#">logout</a></li>
                        </ul>
                    </div>

                </div><!-- end of container -->
            </div><!-- end of navbar navbar-default -->

            <div class="home-details">
                <div class="container">
                    <div class="row col-md-12">
                        <div class="col-md-2">
                            <div ui-view="methods"></div>
                        </div>
                        <div class="col-md-10">
                            <div ui-view="details"></div>
                        </div>
                    </div>
                </div>
            </div>
            <!--
            this is the profile
            <div ui-view="methods"></div>
            <div ui-view="details"></div> -->
        `
    };
    angular
        .module('profile')
        .component('profile', profile)
        .config(["$stateProvider", function($stateProvider) {
            $stateProvider
                .state('profile', {
                    url: '/dashboard/profile',
                    views: {
                        'profile': { component: 'profile'},
                        'methods@profile': { component: 'profileMethods'}
                    }
                });
        }]);
})();

(function() {
    'use strict';
    var profileMethods = {
        template: `
            <div class="list-group table-of-contents" id="profile-list-group">
              <a ui-sref-active="active" class="list-group-item" ui-sref="profile.user">user</a>
              <a ui-sref-active="active" class="list-group-item" ui-sref="profile.billing">billing</a>
              <a ui-sref-active="active" class="list-group-item" ui-sref="profile.notifications">notifications</a>
              <a ui-sref-active="active" class="list-group-item" ui-sref="profile.security">security</a>
              <a ui-sref-active="active" class="list-group-item" ui-sref="profile.saved">saved</a>
              <a ui-sref-active="active" class="list-group-item" ui-sref="profile.admin">admin</a>
            </div>
        `
    };
    angular
        .module('profile')
        .component('profileMethods', profileMethods);
})();

(function() {
    'use strict';
    var saved = {
        templateUrl: `app/profile/saved.component.html`
    };
    angular
        .module('profile')
        .component('saved', saved)
        .config(["$stateProvider", function($stateProvider) {
            $stateProvider
                .state('profile.saved', {
                    url: '/saved',
                    views: {
                        'details@profile': {
                            component: 'saved'
                        }
                    }
                });
        }]);
})();

(function() {
    'use strict';
    var security = {
        templateUrl: `app/profile/security.component.html`
    };
    angular
        .module('profile')
        .component('security', security)
        .config(["$stateProvider", function($stateProvider) {
            $stateProvider
                .state('profile.security', {
                    url: '/security',
                    views: {
                        'details@profile': {
                            component: 'security'
                        }
                    }
                });
        }]);
})();

(function() {
    'use strict';
    var user = {
        templateUrl: `app/profile/user.component.html`
    };
    angular
        .module('profile')
        .component('user', user)
        .config(["$stateProvider", function($stateProvider) {
            $stateProvider
                .state('profile.user', {
                    url: '/user',
                    views: {
                        'details@profile': {
                            component: 'user'
                        }
                    }
                });
        }]);
})();

(function() {
    'use strict';

    AuthorizationInterceptor.$inject = ["$http", "$localStorage", "$state"];
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

(function() {
    'use strict';

    homeService.$inject = ["$http", "$localStorage"];
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

(function() {
    'use strict';

    searchService.$inject = ["$http"];
    function searchService($http) {

        searchreturnVoq = function(param) {};
    }
    angular
        .module('app')
        .service('searchService', searchService);
})();
