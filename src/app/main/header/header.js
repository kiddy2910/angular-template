angular.module('app.main.header', [])

.controller('HeaderCtrl', function($scope, hoiioHttp, MainState, OpenState) {
    $scope.MainState = MainState;
    $scope.OpenState = OpenState;

    $scope.reloadApp = function() {
        hoiioHttp.reloadPage();
    };
});
