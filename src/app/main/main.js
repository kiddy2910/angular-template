angular.module('app.main', ['app.main.route', 'app.main.header', 'app.main.agent', 'app.main.staff'])

.controller('MainCtrl', function($scope, $state, MainState, initData) {
    $scope.isAgent = function() {
        return initData.user.role === 'AGENT';
    };

    $state.go($scope.isAgent() ? MainState.AGENT : MainState.STAFF);
});