angular.module('directive.loading', [])

.directive('loadingBackdrop', function() {
    return {
        scope: {
            isShow: '='
        },
        link: function(scope, element) {
            var backdrop = $('<div class="hidden"></div>');
            backdrop.css('position', 'absolute');
            backdrop.css('top', '0');
            backdrop.css('left', '0');
            backdrop.css('width', '100%');
            backdrop.css('height', '100%');
            backdrop.css('opacity', '0.25');
            backdrop.css('z-index', '1000');
            backdrop.css('background-color', '#ffffff');
            element.append(backdrop);
            element.css('position', 'relative');

            scope.$watch('isShow', function(newValue) {
                if (newValue) {
                    backdrop.removeClass('hidden');
                } else {
                    backdrop.addClass('hidden');
                }
            });
            scope.$on('loading:show', function(e) {
                backdrop.removeClass('hidden');
            });

            scope.$on('loading:hide', function(e) {
                backdrop.addClass('hidden');
            });
        }
    };
})

.directive('loadingSpinner', function() {
    return {
        link: function(scope, element) {
            element.addClass('hidden');

            scope.$on('loading:show', function(e) {
                element.removeClass('hidden');
            });

            scope.$on('loading:hide', function(e) {
                element.addClass('hidden');
            });
        }
    };
});
