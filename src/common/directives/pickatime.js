angular.module('directive.pickatime', [])
    .directive('pickatime', function($timeout) {

        return {
            restrict: 'A',
            link: function(scope, element, attrs, modelCtrl) {
                element.pickatime({});
                var picker = element.pickatime('picker');
            }
        };
    });
