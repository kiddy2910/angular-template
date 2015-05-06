angular.module('resource.bwl', [])

.factory('BlackWhiteList', function(Restangular, paginationUtil) {
    var Bwl = Restangular.one('bwl'),
        LIMIT = 10;

    Restangular.extendModel('bwl', function(model) {
        model.isEmpty = function() {
            return model.list.length === 0;
        };
        return model;
    });

    Bwl.forMediumAndNumber = function(medium, numberKeyword, page) {
        return Bwl.get({
            medium: medium,
            keyword: numberKeyword,
            offset: paginationUtil.getOffset(page, LIMIT),
            limit: LIMIT
        });
    };

    return Bwl;
});
