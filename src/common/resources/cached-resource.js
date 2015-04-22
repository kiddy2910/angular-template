angular.module('resources.cachedResource', [])

.factory('cachedResource', function($q, $cacheFactory, hoiioResource) {
    var cache = $cacheFactory('ConsentHub123');

    return function(cacheKey) {
        return {
            get: function(url, params) {
                return checkAndCall(cacheKey, 'get', url, params);
            },
            save: function(url, params) {
                return checkAndCall(cacheKey, 'save', url, params);
            },
            query: function(url, params) {
                return checkAndCall(cacheKey, 'query', url, params);
            },
            remove: function(url, params) {
                return checkAndCall(cacheKey, 'remove', url, params);
            },
            "delete": function(url, params) {
                return checkAndCall(cacheKey, 'delete', url, params);
            }
        };
    };

    function checkAndCall(cacheKey, method, url, params) {
        var defer = $q.defer();
        var cacheData = cache.get(cacheKey);

        if (cacheData) {
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
