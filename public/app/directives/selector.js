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
