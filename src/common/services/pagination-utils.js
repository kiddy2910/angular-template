angular.module('service.pagination', [])

.factory('paginationUtil', function() {
    return {
        getTotalPages: function(totalRecords, pageSize) {
            return Math.ceil(totalRecords / pageSize);
        },

        getOffset: function(pageIndex, pageSize) {
            return (pageIndex - 1) * pageSize;
        }
    };
});
