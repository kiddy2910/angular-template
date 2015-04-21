angular.module('app.main.staff', ['app.main.staff.route', 'app.main.staff.sidebar'])

.controller('StaffCtrl', function($scope, $state, initData, StaffState) {
    $scope.$on('$stateChangeSuccess', function(e, toState) {
        $scope.currentState = toState;
        // TODO reload data
    });
    $state.go(StaffState.VOICE);
});