angular.module('app.main.staff.sidebar', [])

.controller('StaffSidebarCtrl', function($scope, StaffState) {
    $scope.StaffState = StaffState;
});