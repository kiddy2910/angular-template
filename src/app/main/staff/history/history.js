angular.module('app.main.staff.history', ['app.main.staff.history.log'])

.controller('HistoryCtrl', function($scope, $state, StaffState) {
    $scope.hasResult = false;
    $scope.showHistoryLog = function() {
        $state.go(StaffState.HISTORY_LOG, {
            destination: '+658412345'
        });
    };
});