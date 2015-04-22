angular.module('resources.r', [])

.factory('r', function($resource, hoiioResource) {
    function r(url) {
        var Resource = function(data) {
            angular.extend(this, data);
        };
        Resource.get = function(params, successCallback, errorCallback) {
            var ps = params || {};
            var res = hoiioResource(url).get(ps);
            return thenPromise(res, successCallback, errorCallback);
        };
        Resource.getById = function(id, successCallback, errorCallback) {
            var res = hoiioResource(url + '/' + id).get({});
            return thenPromise(res, successCallback, errorCallback);
        };
        Resource.query = function(params, successCallback, errorCallback) {
            var ps = params || {};
            var res = hoiioResource(url).query(ps);
            return thenPromise(res, successCallback, errorCallback, true);
        };
        return Resource;

        function thenPromise(res, successCallback, errorCallback, isArray) {
            var scb = successCallback || angular.noop,
                ecb = errorCallback || angular.noop,
                ia = isArray || false;

            return res.$promise.then(function(data) {
                var result;
                if (ia) {
                    result = [];
                    for (var i = data.length - 1; i >= 0; i--) {
                        result.push(new Resource(data[i]));
                    }
                } else {
                    result = new Resource(data);
                }
                scb(result);
                return result;

            }, function(response) {
                var ec = response.data.code;
                ecb(ec);
                return ec;
            });
        }
    }
    return r;
});
