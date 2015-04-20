angular.module('resources.cachedResource', [])

.factory('cachedResource', function($q, $cacheFactory, hoiioResource) {
    var cache = $cacheFactory('ConsentHub');

    return function(cacheKey, ignoreCache) {
        return {
            get: function(url, params) {
                return checkAndCall(cacheKey, ignoreCache, 'get', url, params);
            },
            save: function(url, params) {
                return checkAndCall(cacheKey, ignoreCache, 'save', url, params);
            },
            query: function(url, params) {
                return checkAndCall(cacheKey, ignoreCache, 'query', url, params);
            },
            remove: function(url, params) {
                return checkAndCall(cacheKey, ignoreCache, 'remove', url, params);
            },
            "delete": function(url, params) {
                return checkAndCall(cacheKey, ignoreCache, 'delete', url, params);
            }
        };
    };

    function checkAndCall(cacheKey, ignoreCache, method, url, params) {
        var defer = $q.defer();
        var cacheData = cache.get(cacheKey);

        if (ignoreCache && cacheData) {
            defer.resolve(cacheData);

        } else {
            var ps = params == null ? {} : params;

            hoiioResource(url)[method](ps,
                function(data, headers) {
                    cache.put(cacheKey, data);
                    defer.resolve(data);
                },
                function(response) {
                    defer.reject(response.data.code);
                });
        }

        return defer.promise;
    }
});
