angular.module('resources.appData', [])

.factory('appDataService', function(cachedResource) {

    var rootPath = "/init",
        CACHE_KEY = "appData";

    return {
        get: function() {
            return cachedResource(CACHE_KEY).get(rootPath, {});
        }
    };
});
