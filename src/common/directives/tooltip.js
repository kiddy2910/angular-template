angular.module('directive.tooltip', [])

.directive('tooltip', function($compile, $templateCache) {

    /**
     * Delay object can be formatted as bootstrap rule or separated by comma-delimiter.
     *
     * Example: data-delay="1000,100" or data-delay='{"show": 1000, "hide": 100}' or data-delay="1000"
     *
     * @param   {String}   delay
     * @returns {Object} delay instance
     */
    function extractDelay(delay) {
        if (!delay) {
            return null;
        }

        try {
            var delayObject = angular.fromJson(delay);

            if (typeof delayObject === 'number') {
                return {
                    show: delayObject,
                    hide: delayObject
                };
            }

            return delayObject;

        } catch (e) {}

        var parts = delay.split(',');
        if (parts.length > 1) {
            return {
                show: parseInt(parts[0], 10),
                hide: parseInt(parts[1], 10)
            };
        }

        return null;
    }

    return {
        link: function(scope, element, attrs) {
            var id = attrs.id;
            var contentSelector = attrs.contentSelector;
            var contentUrl = attrs.contentUrl;
            var delayInstance = extractDelay(attrs.delay);
            var type = attrs.toggle; // tooltip or popover

            if (type == null) {
                throw 'tooltip directive should have an attribute [data-toggle]';
            }

            scope.$on('tooltip:show', function(e, tooltipId) {
                if (tooltipId == null || tooltipId === id) {
                    invokeMethod('show');
                }
            });

            scope.$on('tooltip:hide', function(e, tooltipId) {
                if (tooltipId == null || tooltipId === id) {
                    invokeMethod('hide');
                }
            });

            if (contentSelector) {
                initTooltip(function() {
                    return $(contentSelector).html();
                });

            } else if (contentUrl) {
                var tpl = $compile($templateCache.get(contentUrl))(scope);
                initTooltip(function() {
                    return tpl;
                });

            } else {
                initTooltip(function() {
                    return attrs.title;
                });
            }


            function initTooltip(fn) {
                if (type === 'popover') {
                    element.popover({
                        delay: delayInstance,
                        content: fn
                    });

                } else {
                    element.tooltip({
                        delay: delayInstance,
                        title: fn
                    });
                }
            }

            function invokeMethod(name) {
                if (type === 'popover') {
                    element.popover(name);
                } else {
                    element.tooltip(name);
                }
            }
        }
    };
});
