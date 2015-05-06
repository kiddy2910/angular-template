angular.module('resource.initData', [])

.factory('InitData', function(Restangular, cache) {
    var CACHE_KEY = 'initData';
    var InitData = Restangular.one('init');

    Restangular.extendModel('init', function(model) {
        model.user.isAgent = function() {
            return this.role === 'AGENT';
        };
        model.user.isDPO = function() {
            return this.role === 'DPO';
        };
        model.user.isAdmin = function() {
            return this.role === 'ADMIN';
        };
        model.user.isStaff = function() {
            return this.role === 'STAFF';
        };
        return model;
    });

    InitData.getUser = function() {
        return init().then(function(data) {
            return data.user;
        });
    };

    InitData.getS3 = function() {
        return init().then(function(data) {
            return data.s3;
        });
    };

    function init() {
        var c = cache(CACHE_KEY);
        if (c.exists()) {
            return c.get();
        } else {
            return InitData.get().then(function(data) {
                c.set(data);
                return data;
            });
        }
    }

    return InitData;
});
