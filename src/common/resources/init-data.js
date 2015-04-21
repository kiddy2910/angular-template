angular.module('resources.initData', [])

.factory('initDataService', function(cachedResource) {

    var rootPath = "/init",
        CACHE_KEY = "initData";

    return {
        get: function() {
            return cachedResource(CACHE_KEY).get(rootPath, {});
        }
    };
});
