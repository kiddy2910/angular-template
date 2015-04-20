angular.module('resources.consentForms', [])

.factory('consentFormService', function(cachedResource) {

    var rootPath = "/consentforms",
        CACHE_KEY = "consentForms";

    return {
        list: function() {
            return cachedResource(CACHE_KEY).get(rootPath, {});
        }
    };
});
