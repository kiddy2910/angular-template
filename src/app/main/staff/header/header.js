angular.module('app.main.staff.header', [])

.controller('HeaderCtrl', function($scope, StaffState) {
    $scope.StaffState = StaffState;
});
