angular.module('directive.pickadate', [])
    .directive('pickadate', function($timeout){
        var defaults = {
            format: 'yyyy-mm-dd',
            formatValue: 'yyyy-mm-dd',
            selectMonths: false,
            selectYears: false,
            firstDay: false
        };

        function parseBoolean(val, defaultValue) {
            if (val === true || val === 'true') {
                return true;
            }
            return defaultValue;
        }

        function fixSelectMonthsOrYears(val, defaultValue) {
            if (val == null) {
                return defaultValue;
            }

            if (val === true || val === 'true') {
                return true;
            }

            var number = parseInt(val, 10);
            return isNaN(number) ? defaultValue : number;
        }

        return {
            restrict: 'A',
            require: '^ngModel',
            scope: {
                minModel: '=?',
                maxModel: '=?',
                disableModel: '=?',
                onSet: '&',         // invoked whenever select a date from UI or call set api manually
                onSelect: '&',      // invoked whenerer select a date from UI
                onSetMin: '&',      // invoked whenever call set('min') api manually
                onSetMax: '&',      // invoked whenever call set('max') api manually
                onSetDisable: '&',  // invoked whenever call set('disable') api manually
                onClear: '&'        // invoked whenever click Clear button or call set('clear') api manually
            },
            link: function(scope, element, attrs, modelCtrl) {
                var options = {};
                angular.extend(options, attrs, {
                    format: attrs.format ? attrs.format : defaults.format,
                    formatValue: attrs.formatValue ? attrs.formatValue : defaults.formatValue,
                    formatSubmit: attrs.formatValue ? attrs.formatValue : defaults.formatValue,
                    editable: parseBoolean(attrs.editable, defaults.editable),
                    firstDay: parseBoolean(attrs.firstDay, defaults.firstDay),
                    selectMonths: fixSelectMonthsOrYears(attrs.selectMonths, defaults.selectMonths),
                    selectYears: fixSelectMonthsOrYears(attrs.selectYears, defaults.selectYears),
                    min: attrs.min ? angular.fromJson(attrs.min) : undefined,
                    max: attrs.max ? angular.fromJson(attrs.max) : undefined,
                    disable: attrs.disable ? angular.fromJson(attrs.disable) : [],

                    onStart: function () {
                        if (attrs.onStart && scope.$parent[attrs.onStart]) {
                            scope$parent[attrs.onStart]();
                        }
                    },
                    onRender: function () {
                        if (attrs.onRender && scope.$parent[attrs.onRender]) {
                            scope.$parent[attrs.onRender]();
                        }
                    },
                    onOpen: function () {
                        if (attrs.onOpen && scope.$parent[attrs.onOpen]) {
                            scope.$parent[attrs.onOpen]();
                        }
                    },
                    onClose: function () {
                        if (attrs.onClose && scope.$parent[attrs.onClose]) {
                            scope.$parent[attrs.onClose]();
                        }
                    },
                    onSet: function (context) {
                        $timeout(function () {
                            if (context.select) {
                                scope.onSelect({date: context.select});
                            } else if (context.min) {
                                scope.onSetMin({min: context.min});
                            } else if (context.max) {
                                scope.onSetMax({max: context.max});
                            } else if (context.disable) {
                                scope.onSetDisable({disable: context.disable});
                            } else if (context.clear !== undefined) {
                                scope.onClear();
                            }

                            scope.onSet({context: context});
                        });
                    },
                    onStop: function () {
                        if (attrs.onStop && scope.$parent[attrs.onStop]) {
                            scope.$parent[attrs.onStop]();
                        }
                    }
                });

                element.pickadate(options);
                var picker = element.pickadate('picker');

                modelCtrl.$parsers.unshift(function (viewValue) {
                    var date = moment(viewValue, options.format.toUpperCase());
                    if (!date.isValid() || date.year() < 1950) {
                        modelCtrl.$setValidity("date", false);
                        return undefined;

                    } else {
                        modelCtrl.$setValidity("date", true);
                        return date.format(options.formatValue.toUpperCase());
                    }
                });

                modelCtrl.$formatters.unshift(function (modelValue) {
                    var date = moment(modelValue, options.formatValue.toUpperCase());
                    if (!date.isValid() || date.year() < 1950) {
                        return undefined;

                    } else {
                        picker.set('select', modelValue, { format: options.formatValue });
                        return date.format(options.format.toUpperCase());
                    }
                });
                
                if (attrs.minModel) {
                    scope.$watch('minModel', function (newValue, oldValue) {
                        if (newValue && newValue !== '') {
                            picker.set('min', newValue);   
                        } else {
                            picker.set('min', options.min);
                        }
                    });  
                }
                
                if (attrs.maxModel) {
                    scope.$watch('maxModel', function (newValue, oldValue) {
                        if (newValue && newValue !== '') {
                            picker.set('max', newValue);   
                        } else {
                            picker.set('max', options.max);
                        }
                    });
                }
                
                if (attrs.disableModel) {
                    scope.$watch('disableModel', function (newValue, oldValue) {
                        if (newValue && newValue !== '') {
                            picker.set('disable', newValue);   
                        } else {
                            picker.set('disable', options.disable);
                        }
                    });
                }
            }
        };
    });