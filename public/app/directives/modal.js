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
