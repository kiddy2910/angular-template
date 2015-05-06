angular.module('app.main.agent', ['app.main.agent.route', 'app.main.agent.sidebar', 'app.main.agent.bwl'])

.controller('AgentCtrl', function($scope, $state, AgentState) {
    $scope.$on('$stateChangeSuccess', function(e, toState) {
        $scope.currentState = toState;
        // TODO reload data
    });
    $state.go(AgentState.BWL);
});