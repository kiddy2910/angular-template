angular.module('app.main.staff.bwl', [])

.controller('StaffBwlCtrl', function($scope, $state, modal, user, StaffState) {
    $scope.user = user;

    $scope.showImportModal = function() {
        $state.go(StaffState.BWL_IMPORT);
    };

    $scope.showExportModal = function() {
        $state.go(StaffState.BWL_EXPORT);
    };

    $scope.isDPO = function() {
        return user.isDPO();
    };
});
