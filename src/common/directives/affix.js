angular.module('directive.affix', [])

.directive('affix', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.affix({
                offset: {
                    top: attrs.offsetTop,
                    bottom: attrs.offsetBottom
                }
            });
        }
    };
});
