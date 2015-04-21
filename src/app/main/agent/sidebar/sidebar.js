angular.module('app.main.agent.sidebar', [])

.controller('AgentSidebarCtrl', function($scope, AgentState) {
    $scope.AgentState = AgentState;
});