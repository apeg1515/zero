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
