angular.module('app.main.shared.bwl', [])

.controller('SharedBwlCtrl', function($scope, $state, BlackWhiteList, confirmModal, Medium) {
    $scope.currentMedium = Medium.VOICE;
    $scope.Medium = Medium;
    $scope.numberKeyword = '';
    $scope.pagination = {
        totalRecords: 125,
        pageSize: 10
    };
    $scope.isLoading = false;
    $scope.blackWhiteList = [];

    $scope.paginate = function(currentPage) {
        var medium = $scope.currentMedium,
            numberKeyword = $scope.numberKeyword;
        $scope.isLoading = true;
        BlackWhiteList.forMediumAndNumber(medium, numberKeyword, currentPage)
            .then(function(data) {
                $scope.isLoading = false;
                $scope.blackWhiteList = data.list;
                $scope.pagination.totalRecords = data.total;
            });
    };

    $scope.activateState = function(medium) {
        if (medium !== $scope.currentMedium) {
            $scope.currentMedium = medium;
            $scope.getBwl();
        }
    };

    $scope.getBwl = function() {
        $scope.$broadcast('pagination:reset');
    };

    $scope.showExport = function() {

    };

    $scope.showImport = function() {

    };

    $scope.changeStatus = function(entryId) {
        confirmModal({
            title: 'Change Status',
            message: 'Status of +84123456 is set as <b>Allowed</b>. Are you sure you want to change to <b>Blocked</b>?',
            icon: 'fa-phone',
            color: 'text-primary',
            onConfirmed: function(cm) {
                console.log('confirmed');
                cm.stopConfirming();
            }
        }).show();
    };

    $scope.remove = function(entryId) {
        confirmModal({
            title: 'Change Status',
            message: 'Status of +84123456 is set as <b>Allowed</b>. Are you sure you want to change to <b>Blocked</b>?',
            color: 'text-primary',
            onConfirmed: function(cm) {
                console.log('confirmed');
                cm.stopConfirming();
            }
        }).show();
    };
});
