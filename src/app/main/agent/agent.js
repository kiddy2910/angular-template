angular.module('app.main.agent', ['app.main.agent.route', 'app.main.agent.sidebar'])

.controller('AgentCtrl', function($scope, $state, initData, AgentState) {
    $scope.$on('$stateChangeSuccess', function(e, toState) {
        $scope.currentState = toState;
        // TODO reload data
    });
    $state.go(AgentState.VOICE);
});