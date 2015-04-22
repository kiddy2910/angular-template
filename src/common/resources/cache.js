angular.module('resources.cache', [])

.factory('cache', function($cacheFactory, $q) {
    var cf = $cacheFactory('ConsentHub');

    function cache(key) {
        var data = cf.get(key);

        var Cache = function() {

        };

        Cache.get = function() {
            var defer = $q.defer();
            defer.resolve(data);
            return defer.promise;
        };

        Cache.set = function(data) {
            cf.put(key, data);
        };

        Cache.exists = function() {
            return data != null;
        };

        return Cache;
    }
    return cache;
});
