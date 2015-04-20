angular.module('app.main.header', [])

.controller('HeaderCtrl', function($scope, hoiioHttp) {

    $scope.reloadApp = function() {
        hoiioHttp.reloadPage();
    };
});
