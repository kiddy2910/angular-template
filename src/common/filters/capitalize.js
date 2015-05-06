angular.module('filter.capitalize', [])

.filter('capitalize', function ($filter, stringUtils) {
    return function (input) {
        var UNDERSCORE = '_';
        
        if (stringUtils.isEmpty(input)) {
            return '';
        }
        
        var lowerAll = input.toLowerCase();
        var parts = lowerAll.split(UNDERSCORE);
        var result = '';
        var p;
        
        for (var i = 0; i < parts.length; i++) {
            p = parts[i];
            
            if (stringUtils.isEmpty(p)) {
                continue;
            }
            
            if (!stringUtils.isEmpty(result)) {
                result += " ";
            }
            
            result += p.substr(0, 1).toUpperCase() + p.substr(1);
        }
        
        return result;
    };
});