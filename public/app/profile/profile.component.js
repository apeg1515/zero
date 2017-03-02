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
        .config(function($stateProvider) {
            $stateProvider
                .state('profile', {
                    url: '/dashboard/profile',
                    views: {
                        'profile': { component: 'profile'},
                        'methods@profile': { component: 'profileMethods'}
                    }
                });
        });
})();
