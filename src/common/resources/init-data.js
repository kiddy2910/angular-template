angular.module('resources.initData', [])

.factory('InitData', function(r, cache) {
    var CACHE_KEY = 'initData',
        InitData = r('/init');

    InitData.info = function() {
        var c = cache(CACHE_KEY);
        if (c.exists()) {
            return c.get();
        } else {
            return InitData.get({}, function(data) {
                c.set(data);
            });
        }
    };
    InitData.prototype.isAgent = function() {
        return this.user.role === 'AGENT';
    };
    return InitData;
});
