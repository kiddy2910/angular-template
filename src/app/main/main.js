angular.module('app.main', ['app.main.route', 'app.main.agent', 'app.main.staff', 'app.main.shared.bwl'])

.controller('MainCtrl', function($scope, $state, hoiioHttp, MainState, user) {
    $scope.isAgent = function() {
        return user.isAgent();
    };
    $scope.reloadApp = function() {
        hoiioHttp.reloadPage();
    };
    $state.go($scope.isAgent() ? MainState.AGENT : MainState.STAFF);
});
